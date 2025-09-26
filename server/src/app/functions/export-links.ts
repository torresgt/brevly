import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import dayjs from "dayjs";
import Papa from "papaparse";
import { env } from "@/env";
import { db } from "@/infra/db";
import { r2 } from "@/infra/storage/client";
import { type Either, makeLeft, makeRight } from "@/shared/either";

class ExportError {
	public readonly _tag = "EXPORT_ERROR";
	constructor(public readonly message: string) {}
}

type ExportLinksOutput = {
	exportUrl: string;
};

export async function exportLinks(): Promise<
	Either<ExportError, ExportLinksOutput>
> {
	try {
		const links = await db.query.urls.findMany({
			orderBy: (urls, { desc }) => [desc(urls.createdAt)],
		});

		if (links.length === 0) {
			return makeLeft(new ExportError("Não existem links para exportar."));
		}

		const csvString = Papa.unparse(
			{
				fields: [
					"URL Original",
					"URL Encurtada",
					"Contagem de Acesso",
					"Data de Criação",
				],
				data: links.map((link) => [
					link.originalUrl,
					link.shortener,
					link.accessCount,
					dayjs(link.createdAt).format("DD/MM/YY - HH:mm"),
				]),
			},
			{ delimiter: ";" },
		);

		const fileName = `brevly-links${randomUUID()}.csv`;
		const csvStringBOM = `\uFEFF${csvString}`; // To treat special characters in csv file

		await r2.send(
			new PutObjectCommand({
				Bucket: env.CLOUDFLARE_BUCKET,
				Key: fileName,
				Body: csvStringBOM,
				ContentDisposition: `attachment; filename="${fileName}"`,
				ContentType: "text/csv;charset=utf-8",
			}),
		);

		const publicUrl = new URL(fileName, env.CLOUDFLARE_PUBLIC_URL).toString();

		return makeRight({ exportUrl: publicUrl });
	} catch (error) {
		console.error("Error to export links:", error);
		return makeLeft(
			new ExportError(
				"An unexpected error occurred while exporting the links.",
			),
		);
	}
}

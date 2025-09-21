import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
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

		// Mapeia os dados para o formato do CSV, definindo os cabeçalhos
		const csvData = links.map((link) => ({
			"URL Original": link.originalUrl,
			"URL Encurtada": link.shortener,
			"Contagem de Acessos": link.accessCount,
			"Data de Criação": link.createdAt.toISOString(),
		}));

		// Converte o array de objetos para uma string no formato CSV
		const csvString = Papa.unparse(csvData);

		// Gera um nome de arquivo aleatório e único
		const fileName = `${randomUUID()}.csv`;

		// Envia o arquivo para o bucket do Cloudflare R2
		await r2.send(
			new PutObjectCommand({
				Bucket: env.CLOUDFLARE_BUCKET,
				Key: fileName,
				Body: csvString,
				ContentType: "text/csv",
			}),
		);

		// Constrói a URL pública final do arquivo
		const publicUrl = new URL(fileName, env.CLOUDFLARE_PUBLIC_URL).toString();

		return makeRight({ exportUrl: publicUrl });
	} catch (error) {
		console.error("Falha ao exportar os links:", error);
		return makeLeft(
			new ExportError("Ocorreu um erro inesperado ao exportar os links."),
		);
	}
}

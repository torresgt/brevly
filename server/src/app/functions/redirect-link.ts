import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFoundError } from "./errors/link-not-found-error";

const redirectLinkInput = z.object({
	shortener: z.string(),
});

type RedirectLinkInput = z.input<typeof redirectLinkInput>;

type RedirectOutput = {
	originalUrl: string;
};

export async function redirectLink(
	input: RedirectLinkInput,
): Promise<Either<LinkNotFoundError, RedirectOutput>> {
	const { shortener } = redirectLinkInput.parse(input);

	const [link] = await db
		.select({
			originalUrl: schema.urls.originalUrl,
		})
		.from(schema.urls)
		.where(eq(schema.urls.shortener, shortener));

	if (!link) {
		return makeLeft(new LinkNotFoundError());
	}

	db.update(schema.urls)
		.set({
			accessCount: sql`${schema.urls.accessCount} + 1`,
		})
		.where(eq(schema.urls.shortener, shortener))
		.execute();

	return makeRight({ originalUrl: link.originalUrl });
}

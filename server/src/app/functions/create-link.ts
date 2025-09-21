import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { LinkAlreadyExistsError } from "./errors/link-already-exists-error";

const createLinkInput = z.object({
	url: z.url(),
	shortener: z.string().min(3).optional(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

type CreateLinkOutput = {
	linkId: string;
};

export async function createLink(
	input: CreateLinkInput,
): Promise<Either<LinkAlreadyExistsError, CreateLinkOutput>> {
	const { url, shortener } = createLinkInput.parse(input);
	const shorterCode = shortener || nanoid(6);

	try {
		const [link] = await db
			.insert(schema.urls)
			.values({
				originalUrl: url,
				shortener: shorterCode,
			})
			.returning({ id: schema.urls.id });

		return makeRight({ linkId: link.id });
	} catch (error) {
		if (
			error instanceof Error &&
			"cause" in error &&
			error.cause instanceof Error &&
			"code" in error.cause &&
			error.cause.code === "23505"
		) {
			return makeLeft(new LinkAlreadyExistsError());
		}
		console.error("Unexpected database error: ", error);
		throw error;
	}
}

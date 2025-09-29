import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFoundError } from "./errors/link-not-found-error";

const deleteLinkInput = z.object({
	linkId: z.uuid(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

type DeleteLinkOutput = {};

export async function deleteLink(
	input: DeleteLinkInput,
): Promise<Either<LinkNotFoundError, DeleteLinkOutput>> {
	const { linkId } = deleteLinkInput.parse(input);

	const [deletedLink] = await db
		.delete(schema.urls)
		.where(eq(schema.urls.id, linkId))
		.returning({ id: schema.urls.id });

	if (!deletedLink) return makeLeft(new LinkNotFoundError());

	return makeRight({});
}

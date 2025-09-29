import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteLink } from "@/app/functions/delete-link";
import { isLeft } from "@/shared/either";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/urls/:id",
		{
			schema: {
				summary: "create a link",
				tags: ["links"],
				params: z.object({
					id: z.uuid("Please provide a valid link ID"),
				}),
				response: {
					204: z.undefined(),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const result = await deleteLink({ linkId: id });

			if (isLeft(result)) {
				return reply.status(404).send();
			}

			return reply.status(204).send();
		},
	);
};

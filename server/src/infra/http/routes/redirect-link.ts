import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { redirectLink } from "@/app/functions/redirect-link";
import { isLeft } from "@/shared/either";

export const redirectLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/:shortener",
		{
			schema: {
				summary: "Redirect to original URL",
				tags: ["Redirect"],
				params: z.object({
					shortener: z.string().min(3),
				}),
				response: {
					301: z.undefined(),
					404: z.object({ message: z.string() }),
				},
			},
		},
		async (request, reply) => {
			const { shortener } = request.params;

			const result = await redirectLink({ shortener });

			if (isLeft(result)) {
				const error = result.left;
				return reply.status(404).send({ message: error.message });
			}

			const { originalUrl } = result.right;
			return reply.status(301).header("location", originalUrl).send();
		},
	);
};

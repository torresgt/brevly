import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/urls",
		{
			schema: {
				summary: "create a link",
				body: z.object({
					name: z.string(),
					password: z.string().optional(),
				}),
				response: {
					200: z.object({ urlId: z.string() }),
					400: z
						.object({ message: z.string() })
						.describe("URL link already exists."),
				},
			},
		},
		async (_request, reply) => {
			return reply.status(200).send({ urlId: "teste" });
		},
	);
};

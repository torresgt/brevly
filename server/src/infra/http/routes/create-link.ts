import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createLink } from "@/app/functions/create-link";
import { isLeft } from "@/shared/either";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/urls",
		{
			schema: {
				summary: "create a link",
				tags: ["links"],
				body: z.object({
					url: z.url({ message: "Please, provide a valid URL" }),
					shortener: z
						.url({ message: "URL invalid" })
						.regex(/^[a-z0-9_-]+$/, { message: "URL shortener is malformed." })
						.min(3, {
							message: "The shortener must have at least 3 characters",
						})
						.transform((val) => val.toLowerCase())
						.optional(),
				}),
				response: {
					201: z.object({
						linkId: z.uuid(),
					}),
					409: z
						.object({ message: z.string() })
						.describe("Conflict: URL link already exists."),
				},
			},
		},
		async (request, reply) => {
			const { url, shortener } = request.body;

			const result = await createLink({ url, shortener });

			if (isLeft(result)) {
				const { message } = result.left;
				return reply.status(409).send({ message });
			}

			const { linkId } = result.right;
			return reply.status(201).send({ linkId });
		},
	);
};

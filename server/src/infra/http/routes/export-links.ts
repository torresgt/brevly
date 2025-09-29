import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { exportLinks } from "@/app/functions/export-links";
import { isLeft } from "@/shared/either";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/urls/export",
		{
			schema: {
				summary: "Export all links to a CSV file",
				tags: ["Links"],
				response: {
					201: z.object({
						exportUrl: z.url(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (_request, reply) => {
			const result = await exportLinks();

			if (isLeft(result)) {
				const error = result.left;
				return reply.status(400).send({ message: error.message });
			}

			const { exportUrl } = result.right;
			return reply.status(201).send({ exportUrl });
		},
	);
};

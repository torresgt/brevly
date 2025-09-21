import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/urls",
		{
			schema: {
				summary: "get links",
				tags: ["links"],
				querystring: z.object({
					searchQuery: z.string().optional(),
					sortBy: z.enum(["createdAt"]).optional(),
					sortDirection: z.enum(["asc", "desc"]).optional(),
					page: z.number().optional().default(1),
					pageSize: z.number().optional().default(20),
				}),
				response: {
					200: z.object({
						total: z.number(),
						links: z.array(
							z.object({
								id: z.string(),
								url: z.url(),
								shortener: z.string(),
								accessCount: z.number(),
								createdAt: z.date(),
							}),
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const { page, pageSize, searchQuery, sortBy, sortDirection } =
				request.query;

			const result = await getLinks({
				page,
				pageSize,
				searchQuery,
				sortBy,
				sortDirection,
			});

			const { total, links } = unwrapEither(result);

			return reply.status(200).send({ total, links });
		},
	);
};

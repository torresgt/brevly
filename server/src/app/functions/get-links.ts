import { asc, count, desc, ilike } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/shared/either";

const getLinksInput = z.object({
	searchQuery: z.string().optional(),
	sortBy: z.enum(["createdAt"]).optional(),
	sortDirection: z.enum(["asc", "desc"]).optional(),
	page: z.number().optional().default(1),
	pageSize: z.number().optional().default(20),
});

type GetLinksInput = z.input<typeof getLinksInput>;

type GetLinksOutput = {
	total: number;
	links: {
		id: string;
		url: string;
		shortener: string;
		accessCount: number;
		createdAt: Date;
	}[];
};

export async function getLinks(
	input: GetLinksInput,
): Promise<Either<never, GetLinksOutput>> {
	const { page, pageSize, searchQuery, sortBy, sortDirection } =
		getLinksInput.parse(input);

	const [links, [{ total }]] = await Promise.all([
		db
			.select({
				id: schema.urls.id,
				url: schema.urls.originalUrl,
				shortener: schema.urls.shortener,
				accessCount: schema.urls.accessCount,
				createdAt: schema.urls.createdAt,
			})
			.from(schema.urls)
			.where(
				searchQuery
					? ilike(schema.urls.shortener, `${searchQuery}`)
					: undefined,
			)
			.orderBy((fields) => {
				if (sortBy && sortDirection === "asc") {
					return asc(fields[sortBy]);
				}

				if (sortBy && sortDirection === "desc") {
					return desc(fields[sortBy]);
				}

				return asc(fields.id);
			})
			.offset((page - 1) * pageSize)
			.limit(pageSize),

		db
			.select({ total: count(schema.urls.id) })
			.from(schema.urls)
			.where(
				searchQuery
					? ilike(schema.urls.shortener, `${searchQuery}`)
					: undefined,
			),
	]);

	return makeRight({ links, total });
}

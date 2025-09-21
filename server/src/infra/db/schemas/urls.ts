import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const urls = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	shortener: text("shortener").unique().notNull(),
	originalUrl: text("original_url").notNull(),
	accessCount: integer("access_count").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

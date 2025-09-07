import { randomUUID } from "node:crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: text("name").notNull(),
	remoteKey: text("remote_key").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

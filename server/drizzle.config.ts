import type { Config } from "drizzle-kit";
import { env } from "@/env";

const databaseUrl = env.DATABASE_URL;
const dbUrlForKit = databaseUrl.replace('pg', 'localhost')

export default {
	dbCredentials: {
		url: dbUrlForKit,
	},
	dialect: "postgresql",
	schema: "src/infra/db/schemas/*",
	out: "src/infra/db/migrations",
} satisfies Config;

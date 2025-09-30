CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"shortener" text NOT NULL,
	"original_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_shortener_unique" UNIQUE("shortener")
);

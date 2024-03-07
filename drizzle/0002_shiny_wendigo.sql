CREATE TABLE IF NOT EXISTS "billboards" (
	"id" serial PRIMARY KEY NOT NULL,
	"store_id" integer NOT NULL,
	"label" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "billboards" ADD CONSTRAINT "billboards_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

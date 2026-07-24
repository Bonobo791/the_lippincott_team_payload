import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Reskin migration — additive only.
 *
 * up() intentionally contains no DROP TABLE / DROP COLUMN / DROP TYPE
 * statements: preview deployments run migrations against the shared
 * database, and dropping the legacy block/global tables would break the
 * live production site before merge. Orphaned legacy tables can be pruned
 * later with a follow-up migration once the reskin is live.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_trust_bar_ratings_source" AS ENUM('google', 'har');
  CREATE TYPE "public"."enum_pages_blocks_awards_stats_stats_icon" AS ENUM('home', 'trophy', 'star');
  CREATE TYPE "public"."enum_pages_blocks_serving_split_quick_links_icon" AS ENUM('buy', 'sell', 'relocate');
  CREATE TYPE "public"."enum_pages_blocks_feature_cards_cards_icon" AS ENUM('search', 'chart', 'bell');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_bar_ratings_source" AS ENUM('google', 'har');
  CREATE TYPE "public"."enum__pages_v_blocks_awards_stats_stats_icon" AS ENUM('home', 'trophy', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_serving_split_quick_links_icon" AS ENUM('buy', 'sell', 'relocate');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_cards_cards_icon" AS ENUM('search', 'chart', 'bell');
  CREATE TYPE "public"."enum_testimonials_source" AS ENUM('google', 'har', 'zillow', 'other');
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT '#1 Team in Northwest Houston',
  	"heading" varchar,
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_bar_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_trust_bar_ratings_source",
  	"score" varchar DEFAULT '4.9',
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reviews_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_awards_stats_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_awards_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_awards_stats_stats_icon",
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_awards_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead_bold" varchar,
  	"lead_link_label" varchar,
  	"lead_link_url" varchar,
  	"lead_tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_track_record" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"background_image_id" integer,
  	"video_id" integer,
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_community_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"subheading" varchar,
  	"card_label" varchar DEFAULT 'View Listings',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_serving_split_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_serving_split_quick_links_icon",
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_serving_split_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_serving_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_cards_cards_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_info_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_info_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"subheading" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_url" varchar,
  	"show_contact" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_agent_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our Agents',
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT '#1 Team in Northwest Houston',
  	"heading" varchar,
  	"background_video_id" integer,
  	"background_image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_bar_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_trust_bar_ratings_source",
  	"score" varchar DEFAULT '4.9',
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reviews_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_stats_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_awards_stats_stats_icon",
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"lead_bold" varchar,
  	"lead_link_label" varchar,
  	"lead_link_url" varchar,
  	"lead_tail" varchar,
  	"intro" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_track_record" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"background_image_id" integer,
  	"video_id" integer,
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_community_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"subheading" varchar,
  	"card_label" varchar DEFAULT 'View Listings',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_serving_split_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_serving_split_quick_links_icon",
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_serving_split_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_serving_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_cards_cards_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_info_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_light" varchar,
  	"heading_bold" varchar,
  	"subheading" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_url" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_url" varchar,
  	"show_contact" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agent_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Our Agents',
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "agents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"photo_id" integer NOT NULL,
  	"bio" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "communities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar,
  	"listings_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"source" "enum_testimonials_source" DEFAULT 'google',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'The Lippincott Team' NOT NULL,
  	"brokerage" varchar DEFAULT 'eXp Realty',
  	"phone" varchar NOT NULL,
  	"phone_href" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"footer_blurb" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_categories_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_categories_fk";
  
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "communities_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "agents_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "communities_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "agents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "agents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "communities_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_ratings" ADD CONSTRAINT "pages_blocks_trust_bar_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar" ADD CONSTRAINT "pages_blocks_trust_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonial" ADD CONSTRAINT "pages_blocks_video_testimonial_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonial" ADD CONSTRAINT "pages_blocks_video_testimonial_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_testimonial" ADD CONSTRAINT "pages_blocks_video_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews_carousel" ADD CONSTRAINT "pages_blocks_reviews_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_stats_awards" ADD CONSTRAINT "pages_blocks_awards_stats_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_stats_stats" ADD CONSTRAINT "pages_blocks_awards_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_stats" ADD CONSTRAINT "pages_blocks_awards_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_track_record" ADD CONSTRAINT "pages_blocks_track_record_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_track_record" ADD CONSTRAINT "pages_blocks_track_record_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_track_record" ADD CONSTRAINT "pages_blocks_track_record_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_track_record" ADD CONSTRAINT "pages_blocks_track_record_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_grid" ADD CONSTRAINT "pages_blocks_community_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_serving_split_quick_links" ADD CONSTRAINT "pages_blocks_serving_split_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_serving_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_serving_split_stats" ADD CONSTRAINT "pages_blocks_serving_split_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_serving_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_serving_split" ADD CONSTRAINT "pages_blocks_serving_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_serving_split" ADD CONSTRAINT "pages_blocks_serving_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards_cards" ADD CONSTRAINT "pages_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_cards" ADD CONSTRAINT "pages_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_grid_items" ADD CONSTRAINT "pages_blocks_info_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_info_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_info_grid" ADD CONSTRAINT "pages_blocks_info_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agent_grid" ADD CONSTRAINT "pages_blocks_agent_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_bar_ratings" ADD CONSTRAINT "_pages_v_blocks_trust_bar_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_bar" ADD CONSTRAINT "_pages_v_blocks_trust_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonial" ADD CONSTRAINT "_pages_v_blocks_video_testimonial_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonial" ADD CONSTRAINT "_pages_v_blocks_video_testimonial_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_testimonial" ADD CONSTRAINT "_pages_v_blocks_video_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reviews_carousel" ADD CONSTRAINT "_pages_v_blocks_reviews_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_stats_awards" ADD CONSTRAINT "_pages_v_blocks_awards_stats_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_stats_stats" ADD CONSTRAINT "_pages_v_blocks_awards_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_stats" ADD CONSTRAINT "_pages_v_blocks_awards_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_track_record" ADD CONSTRAINT "_pages_v_blocks_track_record_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_track_record" ADD CONSTRAINT "_pages_v_blocks_track_record_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_track_record" ADD CONSTRAINT "_pages_v_blocks_track_record_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_track_record" ADD CONSTRAINT "_pages_v_blocks_track_record_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_grid" ADD CONSTRAINT "_pages_v_blocks_community_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_serving_split_quick_links" ADD CONSTRAINT "_pages_v_blocks_serving_split_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_serving_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_serving_split_stats" ADD CONSTRAINT "_pages_v_blocks_serving_split_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_serving_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_serving_split" ADD CONSTRAINT "_pages_v_blocks_serving_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_serving_split" ADD CONSTRAINT "_pages_v_blocks_serving_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_cards" ADD CONSTRAINT "_pages_v_blocks_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_grid_items" ADD CONSTRAINT "_pages_v_blocks_info_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_info_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_info_grid" ADD CONSTRAINT "_pages_v_blocks_info_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agent_grid" ADD CONSTRAINT "_pages_v_blocks_agent_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "agents" ADD CONSTRAINT "agents_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "communities" ADD CONSTRAINT "communities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_children" ADD CONSTRAINT "header_nav_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav" ADD CONSTRAINT "header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_video_idx" ON "pages_blocks_hero" USING btree ("background_video_id");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_trust_bar_ratings_order_idx" ON "pages_blocks_trust_bar_ratings" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_ratings_parent_id_idx" ON "pages_blocks_trust_bar_ratings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_order_idx" ON "pages_blocks_trust_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_parent_id_idx" ON "pages_blocks_trust_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_path_idx" ON "pages_blocks_trust_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_testimonial_order_idx" ON "pages_blocks_video_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_testimonial_parent_id_idx" ON "pages_blocks_video_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_testimonial_path_idx" ON "pages_blocks_video_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_testimonial_video_idx" ON "pages_blocks_video_testimonial" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_testimonial_poster_idx" ON "pages_blocks_video_testimonial" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_reviews_carousel_order_idx" ON "pages_blocks_reviews_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews_carousel_parent_id_idx" ON "pages_blocks_reviews_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews_carousel_path_idx" ON "pages_blocks_reviews_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_awards_stats_awards_order_idx" ON "pages_blocks_awards_stats_awards" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_stats_awards_parent_id_idx" ON "pages_blocks_awards_stats_awards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_stats_stats_order_idx" ON "pages_blocks_awards_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_stats_stats_parent_id_idx" ON "pages_blocks_awards_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_stats_order_idx" ON "pages_blocks_awards_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_stats_parent_id_idx" ON "pages_blocks_awards_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_stats_path_idx" ON "pages_blocks_awards_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_track_record_order_idx" ON "pages_blocks_track_record" USING btree ("_order");
  CREATE INDEX "pages_blocks_track_record_parent_id_idx" ON "pages_blocks_track_record" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_track_record_path_idx" ON "pages_blocks_track_record" USING btree ("_path");
  CREATE INDEX "pages_blocks_track_record_background_image_idx" ON "pages_blocks_track_record" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_track_record_video_idx" ON "pages_blocks_track_record" USING btree ("video_id");
  CREATE INDEX "pages_blocks_track_record_poster_idx" ON "pages_blocks_track_record" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_community_grid_order_idx" ON "pages_blocks_community_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_grid_parent_id_idx" ON "pages_blocks_community_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_grid_path_idx" ON "pages_blocks_community_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_serving_split_quick_links_order_idx" ON "pages_blocks_serving_split_quick_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_serving_split_quick_links_parent_id_idx" ON "pages_blocks_serving_split_quick_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_serving_split_stats_order_idx" ON "pages_blocks_serving_split_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_serving_split_stats_parent_id_idx" ON "pages_blocks_serving_split_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_serving_split_order_idx" ON "pages_blocks_serving_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_serving_split_parent_id_idx" ON "pages_blocks_serving_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_serving_split_path_idx" ON "pages_blocks_serving_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_serving_split_image_idx" ON "pages_blocks_serving_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_cards_cards_order_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_cards_parent_id_idx" ON "pages_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_order_idx" ON "pages_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_cards_parent_id_idx" ON "pages_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_cards_path_idx" ON "pages_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_info_grid_items_order_idx" ON "pages_blocks_info_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_grid_items_parent_id_idx" ON "pages_blocks_info_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_grid_order_idx" ON "pages_blocks_info_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_info_grid_parent_id_idx" ON "pages_blocks_info_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_info_grid_path_idx" ON "pages_blocks_info_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_agent_grid_order_idx" ON "pages_blocks_agent_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_agent_grid_parent_id_idx" ON "pages_blocks_agent_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agent_grid_path_idx" ON "pages_blocks_agent_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_video_idx" ON "_pages_v_blocks_hero" USING btree ("background_video_id");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_trust_bar_ratings_order_idx" ON "_pages_v_blocks_trust_bar_ratings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_bar_ratings_parent_id_idx" ON "_pages_v_blocks_trust_bar_ratings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_bar_order_idx" ON "_pages_v_blocks_trust_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_bar_parent_id_idx" ON "_pages_v_blocks_trust_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_bar_path_idx" ON "_pages_v_blocks_trust_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_testimonial_order_idx" ON "_pages_v_blocks_video_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_testimonial_parent_id_idx" ON "_pages_v_blocks_video_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_testimonial_path_idx" ON "_pages_v_blocks_video_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_testimonial_video_idx" ON "_pages_v_blocks_video_testimonial" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_testimonial_poster_idx" ON "_pages_v_blocks_video_testimonial" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_reviews_carousel_order_idx" ON "_pages_v_blocks_reviews_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reviews_carousel_parent_id_idx" ON "_pages_v_blocks_reviews_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reviews_carousel_path_idx" ON "_pages_v_blocks_reviews_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_awards_stats_awards_order_idx" ON "_pages_v_blocks_awards_stats_awards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_stats_awards_parent_id_idx" ON "_pages_v_blocks_awards_stats_awards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_stats_stats_order_idx" ON "_pages_v_blocks_awards_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_stats_stats_parent_id_idx" ON "_pages_v_blocks_awards_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_stats_order_idx" ON "_pages_v_blocks_awards_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_stats_parent_id_idx" ON "_pages_v_blocks_awards_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_stats_path_idx" ON "_pages_v_blocks_awards_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_track_record_order_idx" ON "_pages_v_blocks_track_record" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_track_record_parent_id_idx" ON "_pages_v_blocks_track_record" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_track_record_path_idx" ON "_pages_v_blocks_track_record" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_track_record_background_image_idx" ON "_pages_v_blocks_track_record" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_track_record_video_idx" ON "_pages_v_blocks_track_record" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_track_record_poster_idx" ON "_pages_v_blocks_track_record" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_community_grid_order_idx" ON "_pages_v_blocks_community_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_grid_parent_id_idx" ON "_pages_v_blocks_community_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_grid_path_idx" ON "_pages_v_blocks_community_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_serving_split_quick_links_order_idx" ON "_pages_v_blocks_serving_split_quick_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_serving_split_quick_links_parent_id_idx" ON "_pages_v_blocks_serving_split_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_serving_split_stats_order_idx" ON "_pages_v_blocks_serving_split_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_serving_split_stats_parent_id_idx" ON "_pages_v_blocks_serving_split_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_serving_split_order_idx" ON "_pages_v_blocks_serving_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_serving_split_parent_id_idx" ON "_pages_v_blocks_serving_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_serving_split_path_idx" ON "_pages_v_blocks_serving_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_serving_split_image_idx" ON "_pages_v_blocks_serving_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_order_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_order_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_cards_parent_id_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_cards_path_idx" ON "_pages_v_blocks_feature_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_info_grid_items_order_idx" ON "_pages_v_blocks_info_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_grid_items_parent_id_idx" ON "_pages_v_blocks_info_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_grid_order_idx" ON "_pages_v_blocks_info_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_info_grid_parent_id_idx" ON "_pages_v_blocks_info_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_info_grid_path_idx" ON "_pages_v_blocks_info_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agent_grid_order_idx" ON "_pages_v_blocks_agent_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agent_grid_parent_id_idx" ON "_pages_v_blocks_agent_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agent_grid_path_idx" ON "_pages_v_blocks_agent_grid" USING btree ("_path");
  CREATE INDEX "agents_photo_idx" ON "agents" USING btree ("photo_id");
  CREATE INDEX "agents_updated_at_idx" ON "agents" USING btree ("updated_at");
  CREATE INDEX "agents_created_at_idx" ON "agents" USING btree ("created_at");
  CREATE UNIQUE INDEX "communities_slug_idx" ON "communities" USING btree ("slug");
  CREATE INDEX "communities_image_idx" ON "communities" USING btree ("image_id");
  CREATE INDEX "communities_updated_at_idx" ON "communities" USING btree ("updated_at");
  CREATE INDEX "communities_created_at_idx" ON "communities" USING btree ("created_at");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "header_nav_children_order_idx" ON "header_nav_children" USING btree ("_order");
  CREATE INDEX "header_nav_children_parent_id_idx" ON "header_nav_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_order_idx" ON "header_nav" USING btree ("_order");
  CREATE INDEX "header_nav_parent_id_idx" ON "header_nav" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_communities_fk" FOREIGN KEY ("communities_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_agents_fk" FOREIGN KEY ("agents_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_communities_fk" FOREIGN KEY ("communities_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_agents_fk" FOREIGN KEY ("agents_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_agents_fk" FOREIGN KEY ("agents_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_communities_fk" FOREIGN KEY ("communities_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_communities_id_idx" ON "pages_rels" USING btree ("communities_id");
  CREATE INDEX "pages_rels_agents_id_idx" ON "pages_rels" USING btree ("agents_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_communities_id_idx" ON "_pages_v_rels" USING btree ("communities_id");
  CREATE INDEX "_pages_v_rels_agents_id_idx" ON "_pages_v_rels" USING btree ("agents_id");
  CREATE INDEX "payload_locked_documents_rels_agents_id_idx" ON "payload_locked_documents_rels" USING btree ("agents_id");
  CREATE INDEX "payload_locked_documents_rels_communities_id_idx" ON "payload_locked_documents_rels" USING btree ("communities_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "communities_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "agents_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "communities_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "agents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "agents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "communities_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  DROP TABLE IF EXISTS "pages_blocks_hero" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_trust_bar_ratings" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_trust_bar" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_video_testimonial" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_reviews_carousel" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_awards_stats_awards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_awards_stats_stats" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_awards_stats" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_track_record" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_community_grid" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_serving_split_quick_links" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_serving_split_stats" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_serving_split" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_feature_cards_cards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_feature_cards" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_faq_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_faq" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_info_grid_items" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_info_grid" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_cta_band" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_agent_grid" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_hero" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_trust_bar_ratings" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_trust_bar" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_video_testimonial" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_reviews_carousel" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_awards_stats_awards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_awards_stats_stats" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_awards_stats" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_track_record" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_community_grid" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_serving_split_quick_links" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_serving_split_stats" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_serving_split" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_feature_cards_cards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_feature_cards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_faq" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_info_grid_items" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_info_grid" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_agent_grid" CASCADE;
  DROP TABLE IF EXISTS "agents" CASCADE;
  DROP TABLE IF EXISTS "communities" CASCADE;
  DROP TABLE IF EXISTS "testimonials" CASCADE;
  DROP TABLE IF EXISTS "header_nav_children" CASCADE;
  DROP TABLE IF EXISTS "header_nav" CASCADE;
  DROP TABLE IF EXISTS "footer_columns_links" CASCADE;
  DROP TABLE IF EXISTS "footer_columns" CASCADE;
  DROP TABLE IF EXISTS "site_settings" CASCADE;
  DROP TYPE IF EXISTS "enum_pages_blocks_trust_bar_ratings_source" CASCADE;
  DROP TYPE IF EXISTS "enum_pages_blocks_awards_stats_stats_icon" CASCADE;
  DROP TYPE IF EXISTS "enum_pages_blocks_serving_split_quick_links_icon" CASCADE;
  DROP TYPE IF EXISTS "enum_pages_blocks_feature_cards_cards_icon" CASCADE;
  DROP TYPE IF EXISTS "enum__pages_v_blocks_trust_bar_ratings_source" CASCADE;
  DROP TYPE IF EXISTS "enum__pages_v_blocks_awards_stats_stats_icon" CASCADE;
  DROP TYPE IF EXISTS "enum__pages_v_blocks_serving_split_quick_links_icon" CASCADE;
  DROP TYPE IF EXISTS "enum__pages_v_blocks_feature_cards_cards_icon" CASCADE;
  DROP TYPE IF EXISTS "enum_testimonials_source" CASCADE;
`);
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_wisata_sub_kategori" AS ENUM('jelajah-alam', 'outdoor-activity', 'aktivitas-keluarga', 'spot-foto');
  CREATE TYPE "public"."enum_kuliner_sub_kategori" AS ENUM('open-now', 'wajib-coba', 'cafe-resto');
  CREATE TYPE "public"."enum_akomodasi_sub_kategori" AS ENUM('villa-resort', 'camping-ground');
  CREATE TYPE "public"."enum_terdekat_kategori" AS ENUM('danau-air', 'petualangan-rafting', 'curug-alam', 'taman-rekreasi');
  CREATE TYPE "public"."enum_blog_kategori" AS ENUM('cerita-feature', 'kegiatan-pengumuman', 'tips-wisata');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'admin',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "wisata_fasilitas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "wisata_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "wisata" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sub_kategori" "enum_wisata_sub_kategori" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"tagline" varchar,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"deskripsi" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar NOT NULL,
  	"lokasi_alamat" varchar NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"harga_tiket" varchar,
  	"jam_buka" varchar,
  	"rating" numeric DEFAULT 4.8,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "kuliner_menu_favorit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama_menu" varchar NOT NULL,
  	"harga" varchar
  );
  
  CREATE TABLE "kuliner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sub_kategori" "enum_kuliner_sub_kategori" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"tagline" varchar,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"deskripsi" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar NOT NULL,
  	"lokasi_alamat" varchar NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"jam_buka" varchar DEFAULT '08:00' NOT NULL,
  	"jam_tutup" varchar DEFAULT '21:00' NOT NULL,
  	"harga_kisaran" varchar NOT NULL,
  	"rating" numeric DEFAULT 4.7,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "akomodasi_fasilitas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "akomodasi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sub_kategori" "enum_akomodasi_sub_kategori" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"tagline" varchar,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"deskripsi" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar NOT NULL,
  	"lokasi_alamat" varchar NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"harga_per_malam" varchar NOT NULL,
  	"kapasitas" varchar,
  	"kontak_booking_whatsapp" varchar,
  	"kontak_booking_telepon" varchar,
  	"kontak_booking_booking_url" varchar,
  	"rating" numeric DEFAULT 4.8,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sejarah_fakta_menarik" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "sejarah" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"era" varchar NOT NULL,
  	"featured" boolean DEFAULT false,
  	"ringkasan" varchar NOT NULL,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"deskripsi" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar NOT NULL,
  	"lokasi_alamat" varchar NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tokoh_kontribusi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "tokoh" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"peran" varchar NOT NULL,
  	"featured" boolean DEFAULT false,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"ringkasan_bio" varchar NOT NULL,
  	"biografi_lengkap" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar DEFAULT 'Desa Cijeruk' NOT NULL,
  	"lokasi_alamat" varchar DEFAULT 'Kecamatan Cijeruk, Kabupaten Bogor' NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "terdekat" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kategori" "enum_terdekat_kategori" NOT NULL,
  	"jarak_waktu" varchar NOT NULL,
  	"tipe_trip" varchar DEFAULT 'Cocok untuk One-Day Trip' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"foto_id" integer,
  	"foto_url" varchar,
  	"tagline" varchar,
  	"deskripsi" varchar NOT NULL,
  	"lokasi_nama_tempat" varchar NOT NULL,
  	"lokasi_alamat" varchar NOT NULL,
  	"lokasi_latitude" numeric,
  	"lokasi_longitude" numeric,
  	"rute_akses" varchar,
  	"harga_tiket" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kategori" "enum_blog_kategori" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"penulis" varchar DEFAULT 'Tim KKN Cijeruk' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"waktu_baca" varchar DEFAULT '3 menit baca',
  	"foto_id" integer,
  	"foto_url" varchar,
  	"ringkasan" varchar NOT NULL,
  	"konten" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profil_desa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama_desa" varchar DEFAULT 'Desa Cijeruk' NOT NULL,
  	"ringkasan_umum" varchar NOT NULL,
  	"sejarah_desa" varchar,
  	"sumber_resmi_portal_bestie_bogor" varchar DEFAULT 'https://bogorkab.go.id/',
  	"sumber_resmi_situs_resmi_desa_id" varchar DEFAULT 'https://cijeruk-bogor.desa.id/',
  	"statistik_jumlah_penduduk" numeric DEFAULT 8945,
  	"statistik_jumlah_kk" numeric DEFAULT 2450,
  	"statistik_luas_wilayah_km2" numeric DEFAULT 12.4,
  	"statistik_ketinggian_meter" numeric DEFAULT 650,
  	"statistik_jumlah_rt" numeric DEFAULT 32,
  	"statistik_jumlah_rw" numeric DEFAULT 8,
  	"apbdes_ringkasan_tahun_anggaran" varchar DEFAULT '2026',
  	"apbdes_ringkasan_total_pendapatan" varchar DEFAULT 'Rp 2.150.000.000',
  	"apbdes_ringkasan_total_belanja" varchar DEFAULT 'Rp 2.080.000.000',
  	"kontak_kantor_alamat" varchar DEFAULT 'Jl. Kolonel Bustomi No. 12, Cijeruk, Kab. Bogor',
  	"kontak_kantor_telepon" varchar DEFAULT '(0251) 8234-900',
  	"kontak_kantor_email" varchar DEFAULT 'pemdes@cijeruk-bogor.desa.id',
  	"kontak_kantor_jam_layanan" varchar DEFAULT 'Senin - Jumat: 08.00 - 16.00 WIB',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"wisata_id" integer,
  	"kuliner_id" integer,
  	"akomodasi_id" integer,
  	"sejarah_id" integer,
  	"tokoh_id" integer,
  	"terdekat_id" integer,
  	"blog_id" integer,
  	"profil_desa_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wisata_fasilitas" ADD CONSTRAINT "wisata_fasilitas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wisata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wisata_highlights" ADD CONSTRAINT "wisata_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wisata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wisata" ADD CONSTRAINT "wisata_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kuliner_menu_favorit" ADD CONSTRAINT "kuliner_menu_favorit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kuliner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kuliner" ADD CONSTRAINT "kuliner_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "akomodasi_fasilitas" ADD CONSTRAINT "akomodasi_fasilitas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."akomodasi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "akomodasi" ADD CONSTRAINT "akomodasi_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sejarah_fakta_menarik" ADD CONSTRAINT "sejarah_fakta_menarik_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sejarah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sejarah" ADD CONSTRAINT "sejarah_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tokoh_kontribusi" ADD CONSTRAINT "tokoh_kontribusi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tokoh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tokoh" ADD CONSTRAINT "tokoh_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terdekat" ADD CONSTRAINT "terdekat_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wisata_fk" FOREIGN KEY ("wisata_id") REFERENCES "public"."wisata"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kuliner_fk" FOREIGN KEY ("kuliner_id") REFERENCES "public"."kuliner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_akomodasi_fk" FOREIGN KEY ("akomodasi_id") REFERENCES "public"."akomodasi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sejarah_fk" FOREIGN KEY ("sejarah_id") REFERENCES "public"."sejarah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tokoh_fk" FOREIGN KEY ("tokoh_id") REFERENCES "public"."tokoh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terdekat_fk" FOREIGN KEY ("terdekat_id") REFERENCES "public"."terdekat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_profil_desa_fk" FOREIGN KEY ("profil_desa_id") REFERENCES "public"."profil_desa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "wisata_fasilitas_order_idx" ON "wisata_fasilitas" USING btree ("_order");
  CREATE INDEX "wisata_fasilitas_parent_id_idx" ON "wisata_fasilitas" USING btree ("_parent_id");
  CREATE INDEX "wisata_highlights_order_idx" ON "wisata_highlights" USING btree ("_order");
  CREATE INDEX "wisata_highlights_parent_id_idx" ON "wisata_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "wisata_slug_idx" ON "wisata" USING btree ("slug");
  CREATE INDEX "wisata_foto_idx" ON "wisata" USING btree ("foto_id");
  CREATE INDEX "wisata_updated_at_idx" ON "wisata" USING btree ("updated_at");
  CREATE INDEX "wisata_created_at_idx" ON "wisata" USING btree ("created_at");
  CREATE INDEX "kuliner_menu_favorit_order_idx" ON "kuliner_menu_favorit" USING btree ("_order");
  CREATE INDEX "kuliner_menu_favorit_parent_id_idx" ON "kuliner_menu_favorit" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "kuliner_slug_idx" ON "kuliner" USING btree ("slug");
  CREATE INDEX "kuliner_foto_idx" ON "kuliner" USING btree ("foto_id");
  CREATE INDEX "kuliner_updated_at_idx" ON "kuliner" USING btree ("updated_at");
  CREATE INDEX "kuliner_created_at_idx" ON "kuliner" USING btree ("created_at");
  CREATE INDEX "akomodasi_fasilitas_order_idx" ON "akomodasi_fasilitas" USING btree ("_order");
  CREATE INDEX "akomodasi_fasilitas_parent_id_idx" ON "akomodasi_fasilitas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "akomodasi_slug_idx" ON "akomodasi" USING btree ("slug");
  CREATE INDEX "akomodasi_foto_idx" ON "akomodasi" USING btree ("foto_id");
  CREATE INDEX "akomodasi_updated_at_idx" ON "akomodasi" USING btree ("updated_at");
  CREATE INDEX "akomodasi_created_at_idx" ON "akomodasi" USING btree ("created_at");
  CREATE INDEX "sejarah_fakta_menarik_order_idx" ON "sejarah_fakta_menarik" USING btree ("_order");
  CREATE INDEX "sejarah_fakta_menarik_parent_id_idx" ON "sejarah_fakta_menarik" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "sejarah_slug_idx" ON "sejarah" USING btree ("slug");
  CREATE INDEX "sejarah_foto_idx" ON "sejarah" USING btree ("foto_id");
  CREATE INDEX "sejarah_updated_at_idx" ON "sejarah" USING btree ("updated_at");
  CREATE INDEX "sejarah_created_at_idx" ON "sejarah" USING btree ("created_at");
  CREATE INDEX "tokoh_kontribusi_order_idx" ON "tokoh_kontribusi" USING btree ("_order");
  CREATE INDEX "tokoh_kontribusi_parent_id_idx" ON "tokoh_kontribusi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tokoh_slug_idx" ON "tokoh" USING btree ("slug");
  CREATE INDEX "tokoh_foto_idx" ON "tokoh" USING btree ("foto_id");
  CREATE INDEX "tokoh_updated_at_idx" ON "tokoh" USING btree ("updated_at");
  CREATE INDEX "tokoh_created_at_idx" ON "tokoh" USING btree ("created_at");
  CREATE UNIQUE INDEX "terdekat_slug_idx" ON "terdekat" USING btree ("slug");
  CREATE INDEX "terdekat_foto_idx" ON "terdekat" USING btree ("foto_id");
  CREATE INDEX "terdekat_updated_at_idx" ON "terdekat" USING btree ("updated_at");
  CREATE INDEX "terdekat_created_at_idx" ON "terdekat" USING btree ("created_at");
  CREATE INDEX "blog_tags_order_idx" ON "blog_tags" USING btree ("_order");
  CREATE INDEX "blog_tags_parent_id_idx" ON "blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_foto_idx" ON "blog" USING btree ("foto_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "profil_desa_updated_at_idx" ON "profil_desa" USING btree ("updated_at");
  CREATE INDEX "profil_desa_created_at_idx" ON "profil_desa" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_wisata_id_idx" ON "payload_locked_documents_rels" USING btree ("wisata_id");
  CREATE INDEX "payload_locked_documents_rels_kuliner_id_idx" ON "payload_locked_documents_rels" USING btree ("kuliner_id");
  CREATE INDEX "payload_locked_documents_rels_akomodasi_id_idx" ON "payload_locked_documents_rels" USING btree ("akomodasi_id");
  CREATE INDEX "payload_locked_documents_rels_sejarah_id_idx" ON "payload_locked_documents_rels" USING btree ("sejarah_id");
  CREATE INDEX "payload_locked_documents_rels_tokoh_id_idx" ON "payload_locked_documents_rels" USING btree ("tokoh_id");
  CREATE INDEX "payload_locked_documents_rels_terdekat_id_idx" ON "payload_locked_documents_rels" USING btree ("terdekat_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "payload_locked_documents_rels_profil_desa_id_idx" ON "payload_locked_documents_rels" USING btree ("profil_desa_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "wisata_fasilitas" CASCADE;
  DROP TABLE "wisata_highlights" CASCADE;
  DROP TABLE "wisata" CASCADE;
  DROP TABLE "kuliner_menu_favorit" CASCADE;
  DROP TABLE "kuliner" CASCADE;
  DROP TABLE "akomodasi_fasilitas" CASCADE;
  DROP TABLE "akomodasi" CASCADE;
  DROP TABLE "sejarah_fakta_menarik" CASCADE;
  DROP TABLE "sejarah" CASCADE;
  DROP TABLE "tokoh_kontribusi" CASCADE;
  DROP TABLE "tokoh" CASCADE;
  DROP TABLE "terdekat" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "profil_desa" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_wisata_sub_kategori";
  DROP TYPE "public"."enum_kuliner_sub_kategori";
  DROP TYPE "public"."enum_akomodasi_sub_kategori";
  DROP TYPE "public"."enum_terdekat_kategori";
  DROP TYPE "public"."enum_blog_kategori";`)
}

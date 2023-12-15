drop policy "Users can delete their own bookmarks." on "public"."raga_bookmarks";

drop policy "Users can insert their own bookmarks" on "public"."raga_bookmarks";

drop policy "Users can view their own bookmarks" on "public"."raga_bookmarks";

drop policy "Users can delete their own votes." on "public"."raga_comment_votes";

drop policy "Users can insert their own votes" on "public"."raga_comment_votes";

drop policy "Users can update their own votes." on "public"."raga_comment_votes";

drop policy "Votes are viewable by everyone." on "public"."raga_comment_votes";

drop policy "Comments are viewable by everyone." on "public"."raga_comments";

drop policy "Users can delete their own comments." on "public"."raga_comments";

drop policy "Users can insert their own comments" on "public"."raga_comments";

drop policy "Users can update their own comments." on "public"."raga_comments";

drop policy "Enable delete for users based on user_id" on "public"."raga_video_favourites";

drop policy "Enable insert for authenticated users only" on "public"."raga_video_favourites";

drop policy "Enable insert for users based on user_id" on "public"."raga_video_favourites";

drop policy "Enable read access for all users" on "public"."raga_video_favourites";

drop policy "Users can delete their own video votes." on "public"."raga_video_votes";

drop policy "Users can insert their own video votes" on "public"."raga_video_votes";

drop policy "Users can update their own video votes." on "public"."raga_video_votes";

drop policy "Video Votes are viewable by everyone." on "public"."raga_video_votes";

alter table "public"."raga_bookmarks" drop constraint "raga_bookmarks_raga_id_fkey";

alter table "public"."raga_bookmarks" drop constraint "raga_bookmarks_user_id_fkey";

alter table "public"."raga_comment_votes" drop constraint "raga_comment_votes_comment_id_fkey";

alter table "public"."raga_comment_votes" drop constraint "raga_comment_votes_user_id_fkey";

alter table "public"."raga_comment_votes" drop constraint "vote_quantity";

alter table "public"."raga_comments" drop constraint "raga_comments_parent_comment_id_fkey";

alter table "public"."raga_comments" drop constraint "raga_comments_raga_id_fkey";

alter table "public"."raga_comments" drop constraint "raga_comments_user_id_fkey";

alter table "public"."raga_video_favourites" drop constraint "raga_video_favourites_user_id_fkey";

alter table "public"."raga_video_favourites" drop constraint "raga_video_favourites_video_id_fkey";

alter table "public"."raga_video_votes" drop constraint "raga_video_votes_user_id_fkey";

alter table "public"."raga_video_votes" drop constraint "raga_video_votes_video_id_fkey";

alter table "public"."raga_video_votes" drop constraint "vote_quantity";

alter table "public"."raga_bookmarks" drop constraint "raga_bookmarks_pkey";

alter table "public"."raga_comment_votes" drop constraint "raga_comment_votes_pkey";

alter table "public"."raga_comments" drop constraint "raga_comments_pkey";

alter table "public"."raga_video_favourites" drop constraint "raga_video_favourites_pkey";

alter table "public"."raga_video_votes" drop constraint "raga_video_votes_pkey";

drop index if exists "public"."raga_bookmarks_pkey";

drop index if exists "public"."raga_comment_votes_pkey";

drop index if exists "public"."raga_comments_pkey";

drop index if exists "public"."raga_video_favourites_pkey";

drop index if exists "public"."raga_video_votes_pkey";

drop table "public"."raga_bookmarks";

drop table "public"."raga_comment_votes";

drop table "public"."raga_comments";

drop table "public"."raga_video_favourites";

drop table "public"."raga_video_votes";

create table "public"."composers" (
    "id" bigint generated by default as identity not null,
    "name" text not null,
    "years" text,
    "languages" text,
    "url" text
);


alter table "public"."composers" enable row level security;

create table "public"."compositions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "raga" bigint,
    "tala" bigint,
    "format" text default ''::text,
    "title" text not null default ''::text
);


alter table "public"."compositions" enable row level security;

create table "public"."talas" (
    "id" bigint generated by default as identity not null,
    "name" text not null,
    "nadai" integer not null default 4,
    "jati" integer not null default 4,
    "tala" text not null
);


alter table "public"."talas" enable row level security;

CREATE UNIQUE INDEX composers_pkey ON public.composers USING btree (id);

CREATE UNIQUE INDEX compositions_pkey ON public.compositions USING btree (id);

CREATE UNIQUE INDEX talas_pkey ON public.talas USING btree (id);

alter table "public"."composers" add constraint "composers_pkey" PRIMARY KEY using index "composers_pkey";

alter table "public"."compositions" add constraint "compositions_pkey" PRIMARY KEY using index "compositions_pkey";

alter table "public"."talas" add constraint "talas_pkey" PRIMARY KEY using index "talas_pkey";

alter table "public"."compositions" add constraint "compositions_raga_fkey" FOREIGN KEY (raga) REFERENCES ragas(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."compositions" validate constraint "compositions_raga_fkey";

alter table "public"."compositions" add constraint "compositions_tala_fkey" FOREIGN KEY (tala) REFERENCES talas(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."compositions" validate constraint "compositions_tala_fkey";

create policy "Enable read access for all users"
on "public"."composers"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."compositions"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."talas"
as permissive
for select
to public
using (true);



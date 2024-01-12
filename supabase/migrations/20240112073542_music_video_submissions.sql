drop policy "Users can delete their own Videos." on "public"."raga_videos";

drop policy "Users can insert their own Videos" on "public"."raga_videos";

drop policy "Users can update their own Videos." on "public"."raga_videos";

drop policy "Videos are viewable by everyone." on "public"."raga_videos";

alter table "public"."pending_artists" drop constraint "pending_artists_video_id_fkey";

alter table "public"."raga_video_artists" drop constraint "raga_video_artists_artist_id_fkey";

alter table "public"."raga_video_artists" drop constraint "raga_video_artists_role_check";

alter table "public"."raga_video_artists" drop constraint "raga_video_artists_video_id_fkey";

alter table "public"."raga_videos" drop constraint "raga_videos_raga_id_fkey";

alter table "public"."raga_videos" drop constraint "raga_videos_user_id_fkey";

alter table "public"."submission_artists" drop constraint "submission_artists_submission_id_fkey";

alter table "public"."submission_pending_artists" drop constraint "submission_pending_artists_submission_id_fkey";

alter table "public"."submissions" drop constraint "submissions_approved_video_id_fkey";

alter table "public"."submissions" drop constraint "submissions_status_check";

alter table "public"."raga_video_artists" drop constraint "raga_video_artists_pkey";

alter table "public"."raga_videos" drop constraint "raga_videos_pkey";

drop index if exists "public"."raga_videos_pkey";

drop index if exists "public"."raga_video_artists_pkey";

drop table "public"."raga_video_artists";

drop table "public"."raga_videos";

create table "public"."music_video_artists" (
    "video_id" uuid not null,
    "artist_id" integer not null,
    "role" text,
    "instrument" text not null
);

alter table "public"."music_video_artists" enable row level security;

create table "public"."music_videos" (
    "youtube_url" text not null,
    "youtube_video_id" text not null,
    "image" text not null,
    "composition_id" bigint,
    "raga_id" bigint,
    "tala_id" bigint,
    "user_id" uuid not null,
    "composer_id" bigint,
    "composition_title" text,
    "moods" text[],
    "format" text not null default ''::text,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."music_videos" enable row level security;

alter table "public"."compositions" add column "composer" bigint not null;

alter table "public"."pending_artists" drop column "video_id";

alter table "public"."pending_artists" add column "submission_id" bigint not null;

alter table "public"."pending_artists" enable row level security;

alter table "public"."submission_artists" add column "instrument" text;

alter table "public"."submission_artists" enable row level security;

alter table "public"."submission_pending_artists" add column "instrument" text;

alter table "public"."submission_pending_artists" enable row level security;

alter table "public"."submissions" add column "composer_id" bigint;

alter table "public"."submissions" add column "composition_title" text;

alter table "public"."submissions" add column "format" text not null default ''::text;

alter table "public"."submissions" add column "moods" text[];

alter table "public"."submissions" enable row level security;

CREATE UNIQUE INDEX music_videos_pkey ON public.music_videos USING btree (id);

CREATE UNIQUE INDEX music_videos_youtube_video_id_key ON public.music_videos USING btree (youtube_video_id);

CREATE UNIQUE INDEX raga_video_artists_pkey ON public.music_video_artists USING btree (video_id, artist_id);

alter table "public"."music_video_artists" add constraint "raga_video_artists_pkey" PRIMARY KEY using index "raga_video_artists_pkey";

alter table "public"."music_videos" add constraint "music_videos_pkey" PRIMARY KEY using index "music_videos_pkey";

alter table "public"."compositions" add constraint "compositions_composer_fkey" FOREIGN KEY (composer) REFERENCES composers(id) ON UPDATE CASCADE not valid;

alter table "public"."compositions" validate constraint "compositions_composer_fkey";

alter table "public"."music_video_artists" add constraint "music_video_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE not valid;

alter table "public"."music_video_artists" validate constraint "music_video_artists_artist_id_fkey";

alter table "public"."music_video_artists" add constraint "music_video_artists_video_id_fkey" FOREIGN KEY (video_id) REFERENCES music_videos(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."music_video_artists" validate constraint "music_video_artists_video_id_fkey";

alter table "public"."music_video_artists" add constraint "raga_video_artists_role_check" CHECK ((role = ANY (ARRAY['main'::text, 'accompanying'::text]))) not valid;

alter table "public"."music_video_artists" validate constraint "raga_video_artists_role_check";

alter table "public"."music_videos" add constraint "music_videos_composer_id_fkey" FOREIGN KEY (composer_id) REFERENCES composers(id) not valid;

alter table "public"."music_videos" validate constraint "music_videos_composer_id_fkey";

alter table "public"."music_videos" add constraint "music_videos_composition_id_fkey" FOREIGN KEY (composition_id) REFERENCES compositions(id) not valid;

alter table "public"."music_videos" validate constraint "music_videos_composition_id_fkey";

alter table "public"."music_videos" add constraint "music_videos_raga_id_fkey" FOREIGN KEY (raga_id) REFERENCES ragas(id) not valid;

alter table "public"."music_videos" validate constraint "music_videos_raga_id_fkey";

alter table "public"."music_videos" add constraint "music_videos_tala_id_fkey" FOREIGN KEY (tala_id) REFERENCES talas(id) not valid;

alter table "public"."music_videos" validate constraint "music_videos_tala_id_fkey";

alter table "public"."music_videos" add constraint "music_videos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."music_videos" validate constraint "music_videos_user_id_fkey";

alter table "public"."music_videos" add constraint "music_videos_youtube_video_id_key" UNIQUE using index "music_videos_youtube_video_id_key";

alter table "public"."pending_artists" add constraint "pending_artists_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES submissions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pending_artists" validate constraint "pending_artists_submission_id_fkey";

alter table "public"."submissions" add constraint "submissions_composer_id_fkey" FOREIGN KEY (composer_id) REFERENCES composers(id) ON UPDATE CASCADE not valid;

alter table "public"."submissions" validate constraint "submissions_composer_id_fkey";

alter table "public"."submission_artists" add constraint "submission_artists_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES submissions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."submission_artists" validate constraint "submission_artists_submission_id_fkey";

alter table "public"."submission_pending_artists" add constraint "submission_pending_artists_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES submissions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."submission_pending_artists" validate constraint "submission_pending_artists_submission_id_fkey";

alter table "public"."submissions" add constraint "submissions_approved_video_id_fkey" FOREIGN KEY (approved_video_id) REFERENCES music_videos(id) not valid;

alter table "public"."submissions" validate constraint "submissions_approved_video_id_fkey";

alter table "public"."submissions" add constraint "submissions_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text, 'merged'::text, 'draft'::text]))) not valid;

alter table "public"."submissions" validate constraint "submissions_status_check";

set check_function_bodies = off;


CREATE OR REPLACE FUNCTION public.delete_claim(uid uuid, claim text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claim(uid uuid, claim text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claims(uid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claims()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$function$
;

CREATE OR REPLACE FUNCTION public.is_claims_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF;
      If current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role' THEN
        RETURN true; -- service role users have admin rights
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_claim(uid uuid, claim text, value jsonb)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

create policy "Moderators can insert, update and delete all Artists"
on "public"."artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Moderators can insert, update, delete compositions"
on "public"."compositions"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Enable read access for all users"
on "public"."music_video_artists"
as permissive
for select
to public
using (true);


create policy "Moderators can insert, update and delete Music Video Artists"
on "public"."music_video_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Enable read access for all users"
on "public"."music_videos"
as permissive
for select
to public
using (true);


create policy "Moderators can insert, update and delete ALL Music Videos"
on "public"."music_videos"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Curators can insert, update and delete Pending Artists"
on "public"."pending_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"curator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"curator"'::jsonb));


create policy "Moderators can insert, update and delete ALL Pending Artists"
on "public"."pending_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Curators can insert, update and delete Submission Artists"
on "public"."submission_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"curator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"curator"'::jsonb));


create policy "Moderators can view, insert, update and delete ALL"
on "public"."submission_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Curators can insert, update, delete Submission Pending Artists"
on "public"."submission_pending_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"curator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"curator"'::jsonb));


create policy "Moderators can insert, update, delete ALL"
on "public"."submission_pending_artists"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));


create policy "Curators can insert, update and delete THEIR Submissions"
on "public"."submissions"
as permissive
for all
to authenticated
using (((get_my_claim('userrole'::text) = '"curator"'::jsonb) AND (auth.uid() = user_id)))
with check (((get_my_claim('userrole'::text) = '"curator"'::jsonb) AND (auth.uid() = user_id)));


create policy "Moderators can view, insert, update and delete ALL Submissions"
on "public"."submissions"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"moderator"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"moderator"'::jsonb));




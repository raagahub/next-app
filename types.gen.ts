export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      artists: {
        Row: {
          alt_instruments: string[] | null
          id: number
          main_instrument: string
          name: string
        }
        Insert: {
          alt_instruments?: string[] | null
          id?: never
          main_instrument: string
          name: string
        }
        Update: {
          alt_instruments?: string[] | null
          id?: never
          main_instrument?: string
          name?: string
        }
        Relationships: []
      }
      composers: {
        Row: {
          id: number
          languages: string | null
          name: string
          url: string | null
          years: string | null
        }
        Insert: {
          id?: number
          languages?: string | null
          name: string
          url?: string | null
          years?: string | null
        }
        Update: {
          id?: number
          languages?: string | null
          name?: string
          url?: string | null
          years?: string | null
        }
        Relationships: []
      }
      compositions: {
        Row: {
          composer: number
          created_at: string
          format: string | null
          id: number
          raga: number | null
          tala: number | null
          title: string
        }
        Insert: {
          composer: number
          created_at?: string
          format?: string | null
          id?: number
          raga?: number | null
          tala?: number | null
          title?: string
        }
        Update: {
          composer?: number
          created_at?: string
          format?: string | null
          id?: number
          raga?: number | null
          tala?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "compositions_composer_fkey"
            columns: ["composer"]
            referencedRelation: "composers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compositions_raga_fkey"
            columns: ["raga"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compositions_tala_fkey"
            columns: ["tala"]
            referencedRelation: "talas"
            referencedColumns: ["id"]
          }
        ]
      }
      music_video_artists: {
        Row: {
          artist_id: number
          instrument: string
          role: string | null
          video_id: string
        }
        Insert: {
          artist_id: number
          instrument: string
          role?: string | null
          video_id: string
        }
        Update: {
          artist_id?: number
          instrument?: string
          role?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "music_video_artists_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_video_artists_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "music_videos"
            referencedColumns: ["id"]
          }
        ]
      }
      music_videos: {
        Row: {
          composer_id: number | null
          composition_id: number | null
          composition_title: string | null
          format: string
          id: string
          image: string
          moods: string[] | null
          raga_id: number | null
          tala_id: number | null
          user_id: string
          youtube_url: string
          youtube_video_id: string
        }
        Insert: {
          composer_id?: number | null
          composition_id?: number | null
          composition_title?: string | null
          format?: string
          id?: string
          image: string
          moods?: string[] | null
          raga_id?: number | null
          tala_id?: number | null
          user_id: string
          youtube_url: string
          youtube_video_id: string
        }
        Update: {
          composer_id?: number | null
          composition_id?: number | null
          composition_title?: string | null
          format?: string
          id?: string
          image?: string
          moods?: string[] | null
          raga_id?: number | null
          tala_id?: number | null
          user_id?: string
          youtube_url?: string
          youtube_video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "music_videos_composer_id_fkey"
            columns: ["composer_id"]
            referencedRelation: "composers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_videos_composition_id_fkey"
            columns: ["composition_id"]
            referencedRelation: "compositions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_videos_raga_id_fkey"
            columns: ["raga_id"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_videos_tala_id_fkey"
            columns: ["tala_id"]
            referencedRelation: "talas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "music_videos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pending_artists: {
        Row: {
          approved_artist_id: number | null
          id: number
          main_instrument: string
          name: string
          notes: string | null
          role: string | null
          status: string | null
          submission_id: number
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          approved_artist_id?: number | null
          id?: number
          main_instrument: string
          name: string
          notes?: string | null
          role?: string | null
          status?: string | null
          submission_id: number
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          approved_artist_id?: number | null
          id?: number
          main_instrument?: string
          name?: string
          notes?: string | null
          role?: string | null
          status?: string | null
          submission_id?: number
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_artists_approved_artist_id_fkey"
            columns: ["approved_artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_artists_submission_id_fkey"
            columns: ["submission_id"]
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_artists_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ragas: {
        Row: {
          aliases: string | null
          arohanam: string | null
          avarohanam: string | null
          chakra: string | null
          format_name: string | null
          id: number
          is_bashanga: boolean | null
          is_janaka: boolean | null
          is_janya: boolean | null
          is_upanga: boolean | null
          is_vakra: boolean | null
          melakarta: number | null
          melakarta_name: string | null
          name: string | null
        }
        Insert: {
          aliases?: string | null
          arohanam?: string | null
          avarohanam?: string | null
          chakra?: string | null
          format_name?: string | null
          id: number
          is_bashanga?: boolean | null
          is_janaka?: boolean | null
          is_janya?: boolean | null
          is_upanga?: boolean | null
          is_vakra?: boolean | null
          melakarta?: number | null
          melakarta_name?: string | null
          name?: string | null
        }
        Update: {
          aliases?: string | null
          arohanam?: string | null
          avarohanam?: string | null
          chakra?: string | null
          format_name?: string | null
          id?: number
          is_bashanga?: boolean | null
          is_janaka?: boolean | null
          is_janya?: boolean | null
          is_upanga?: boolean | null
          is_vakra?: boolean | null
          melakarta?: number | null
          melakarta_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      submission_artists: {
        Row: {
          artist_id: number
          instrument: string | null
          role: string | null
          submission_id: number
        }
        Insert: {
          artist_id: number
          instrument?: string | null
          role?: string | null
          submission_id: number
        }
        Update: {
          artist_id?: number
          instrument?: string | null
          role?: string | null
          submission_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "submission_artists_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_artists_submission_id_fkey"
            columns: ["submission_id"]
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          }
        ]
      }
      submission_pending_artists: {
        Row: {
          instrument: string | null
          pending_artist_id: number
          role: string | null
          submission_id: number
        }
        Insert: {
          instrument?: string | null
          pending_artist_id: number
          role?: string | null
          submission_id: number
        }
        Update: {
          instrument?: string | null
          pending_artist_id?: number
          role?: string | null
          submission_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "submission_pending_artists_pending_artist_id_fkey"
            columns: ["pending_artist_id"]
            referencedRelation: "pending_artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_pending_artists_submission_id_fkey"
            columns: ["submission_id"]
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions: {
        Row: {
          approved_video_id: string | null
          composer_id: number | null
          composition_id: number | null
          composition_title: string | null
          format: string
          id: number
          image: string
          moods: string[] | null
          new_composition: boolean | null
          notes: string | null
          raga_id: number | null
          status: string | null
          submitted_at: string | null
          tala_id: number | null
          title: string
          user_id: string
          youtube_url: string
          youtube_video_id: string
        }
        Insert: {
          approved_video_id?: string | null
          composer_id?: number | null
          composition_id?: number | null
          composition_title?: string | null
          format?: string
          id?: never
          image: string
          moods?: string[] | null
          new_composition?: boolean | null
          notes?: string | null
          raga_id?: number | null
          status?: string | null
          submitted_at?: string | null
          tala_id?: number | null
          title: string
          user_id: string
          youtube_url: string
          youtube_video_id: string
        }
        Update: {
          approved_video_id?: string | null
          composer_id?: number | null
          composition_id?: number | null
          composition_title?: string | null
          format?: string
          id?: never
          image?: string
          moods?: string[] | null
          new_composition?: boolean | null
          notes?: string | null
          raga_id?: number | null
          status?: string | null
          submitted_at?: string | null
          tala_id?: number | null
          title?: string
          user_id?: string
          youtube_url?: string
          youtube_video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_approved_video_id_fkey"
            columns: ["approved_video_id"]
            referencedRelation: "music_videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_composer_id_fkey"
            columns: ["composer_id"]
            referencedRelation: "composers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_composition_id_fkey"
            columns: ["composition_id"]
            referencedRelation: "compositions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_raga_id_fkey"
            columns: ["raga_id"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_tala_id_fkey"
            columns: ["tala_id"]
            referencedRelation: "talas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      talas: {
        Row: {
          id: number
          jati: number
          nadai: number
          name: string
          tala: string
        }
        Insert: {
          id?: number
          jati?: number
          nadai?: number
          name: string
          tala: string
        }
        Update: {
          id?: number
          jati?: number
          nadai?: number
          name?: string
          tala?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      commit_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      rollback_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      start_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


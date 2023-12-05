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
      pending_artists: {
        Row: {
          approved_artist_id: number | null
          id: number
          main_instrument: string
          name: string
          notes: string | null
          role: string | null
          status: string | null
          submitted_at: string | null
          user_id: string
          video_id: string | null
        }
        Insert: {
          approved_artist_id?: number | null
          id?: number
          main_instrument: string
          name: string
          notes?: string | null
          role?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id: string
          video_id?: string | null
        }
        Update: {
          approved_artist_id?: number | null
          id?: number
          main_instrument?: string
          name?: string
          notes?: string | null
          role?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_artists_approved_artist_id_fkey"
            columns: ["approved_artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_artists_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_artists_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "raga_videos"
            referencedColumns: ["video_id"]
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
      raga_bookmarks: {
        Row: {
          created_at: string | null
          raga_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          raga_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          raga_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raga_bookmarks_raga_id_fkey"
            columns: ["raga_id"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_bookmarks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      raga_comment_votes: {
        Row: {
          comment_id: string
          user_id: string
          value: number
        }
        Insert: {
          comment_id: string
          user_id: string
          value: number
        }
        Update: {
          comment_id?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "raga_comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            referencedRelation: "raga_comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "raga_comment_votes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      raga_comments: {
        Row: {
          comment_id: string
          content: string | null
          created_at: string
          parent_comment_id: string | null
          raga_id: number
          user_id: string
        }
        Insert: {
          comment_id?: string
          content?: string | null
          created_at?: string
          parent_comment_id?: string | null
          raga_id: number
          user_id: string
        }
        Update: {
          comment_id?: string
          content?: string | null
          created_at?: string
          parent_comment_id?: string | null
          raga_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raga_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            referencedRelation: "raga_comments"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "raga_comments_raga_id_fkey"
            columns: ["raga_id"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      raga_video_artists: {
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
            foreignKeyName: "raga_video_artists_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_video_artists_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "raga_videos"
            referencedColumns: ["video_id"]
          }
        ]
      }
      raga_video_favourites: {
        Row: {
          created_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raga_video_favourites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_video_favourites_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "raga_videos"
            referencedColumns: ["video_id"]
          }
        ]
      }
      raga_video_votes: {
        Row: {
          user_id: string
          value: number
          video_id: string
        }
        Insert: {
          user_id: string
          value: number
          video_id: string
        }
        Update: {
          user_id?: string
          value?: number
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raga_video_votes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_video_votes_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "raga_videos"
            referencedColumns: ["video_id"]
          }
        ]
      }
      raga_videos: {
        Row: {
          created_at: string | null
          raga_id: number
          user_id: string
          video_id: string
          video_url: string | null
          youtube_video_id: string | null
        }
        Insert: {
          created_at?: string | null
          raga_id: number
          user_id: string
          video_id?: string
          video_url?: string | null
          youtube_video_id?: string | null
        }
        Update: {
          created_at?: string | null
          raga_id?: number
          user_id?: string
          video_id?: string
          video_url?: string | null
          youtube_video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raga_videos_raga_id_fkey"
            columns: ["raga_id"]
            referencedRelation: "ragas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raga_videos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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


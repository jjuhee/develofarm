export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      academies: {
        Row: {
          academy_major: string | null
          academy_name: string | null
          id: string
          period_from: string | null
          period_to: string | null
          user_id: string
        }
        Insert: {
          academy_major?: string | null
          academy_name?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          user_id: string
        }
        Update: {
          academy_major?: string | null
          academy_name?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      award_history: {
        Row: {
          award_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          award_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          award_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "award_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      bookmarks: {
        Row: {
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      careers: {
        Row: {
          company_name: string | null
          employed_status: boolean
          id: string
          period_from: string | null
          period_to: string | null
          responsibility: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          employed_status?: boolean
          id?: string
          period_from?: string | null
          period_to?: string | null
          responsibility?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          employed_status?: boolean
          id?: string
          period_from?: string | null
          period_to?: string | null
          responsibility?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "careers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          comment_id: string | null
          content: string
          created_at: string
          del_yn: boolean | null
          id: string
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          content: string
          created_at?: string
          del_yn?: boolean | null
          id?: string
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string | null
          content?: string
          created_at?: string
          del_yn?: boolean | null
          id?: string
          project_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      education: {
        Row: {
          graduated: string | null
          id: string
          period_from: string | null
          period_to: string | null
          school_major: string | null
          school_name: string | null
          user_id: string | null
        }
        Insert: {
          graduated?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          school_major?: string | null
          school_name?: string | null
          user_id?: string | null
        }
        Update: {
          graduated?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          school_major?: string | null
          school_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          project_id: string
          receiver_id: string
          sender_nickname: string
          status: boolean
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          receiver_id: string
          sender_nickname: string
          status?: boolean
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          receiver_id?: string
          sender_nickname?: string
          status?: boolean
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      position_tech: {
        Row: {
          id: string
          position_id: string
          tech_id: string
        }
        Insert: {
          id?: string
          position_id: string
          tech_id: string
        }
        Update: {
          id?: string
          position_id?: string
          tech_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "position_tech_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "position_tech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "techs"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      project_members: {
        Row: {
          application_status: boolean | null
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          application_status?: boolean | null
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          application_status?: boolean | null
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project_position: {
        Row: {
          id: string
          position_id: string
          project_id: string
        }
        Insert: {
          id?: string
          position_id: string
          project_id: string
        }
        Update: {
          id?: string
          position_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_position_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_position_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      project_regions: {
        Row: {
          id: string
          region: string | null
        }
        Insert: {
          id?: string
          region?: string | null
        }
        Update: {
          id?: string
          region?: string | null
        }
        Relationships: []
      }
      project_tech: {
        Row: {
          id: string
          project_id: string
          tech_id: string
        }
        Insert: {
          id?: string
          project_id: string
          tech_id: string
        }
        Update: {
          id?: string
          project_id?: string
          tech_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tech_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "techs"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          bookmark_count: number | null
          content: string
          created_at: string | null
          id: string
          is_offline: boolean
          number_of_people: number
          picture_url: string | null
          project_end_date: string
          project_start_date: string
          recruit_status: boolean | null
          region_id: string | null
          title: string
          updated_at: string | null
          user_id: string
          views: number
        }
        Insert: {
          bookmark_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          is_offline: boolean
          number_of_people: number
          picture_url?: string | null
          project_end_date: string
          project_start_date: string
          recruit_status?: boolean | null
          region_id?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          views?: number
        }
        Update: {
          bookmark_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          is_offline?: boolean
          number_of_people?: number
          picture_url?: string | null
          project_end_date?: string
          project_start_date?: string
          recruit_status?: boolean | null
          region_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "project_regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      social_links: {
        Row: {
          blog_url: string | null
          github_url: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          blog_url?: string | null
          github_url?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          blog_url?: string | null
          github_url?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      specs: {
        Row: {
          id: string
          spec_date: string | null
          spec_name: string | null
          user_id: string
        }
        Insert: {
          id?: string
          spec_date?: string | null
          spec_name?: string | null
          user_id: string
        }
        Update: {
          id?: string
          spec_date?: string | null
          spec_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "specs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      techs: {
        Row: {
          id: string
          tech_name: string
        }
        Insert: {
          id?: string
          tech_name: string
        }
        Update: {
          id?: string
          tech_name?: string
        }
        Relationships: []
      }
      user_tech: {
        Row: {
          id: string
          tech_id: string
          user_id: string
        }
        Insert: {
          id?: string
          tech_id: string
          user_id: string
        }
        Update: {
          id?: string
          tech_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "techs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tech_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          positionId: string | null
          user_comment: string | null
          user_email: string | null
          user_nickname: string | null
          user_phone_number: string | null
          user_status: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          positionId?: string | null
          user_comment?: string | null
          user_email?: string | null
          user_nickname?: string | null
          user_phone_number?: string | null
          user_status?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          positionId?: string | null
          user_comment?: string | null
          user_email?: string | null
          user_nickname?: string | null
          user_phone_number?: string | null
          user_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_positionId_fkey"
            columns: ["positionId"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      unique_projects: {
        Row: {
          project_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      get_top_projects: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          content: string
          picture_url: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

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
      bookmarks: {
        Row: {
          bookmark_id: string
          project_id: string
          user_id: string
        }
        Insert: {
          bookmark_id?: string
          project_id: string
          user_id: string
        }
        Update: {
          bookmark_id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      careers: {
        Row: {
          career_id: string
          company_name: string | null
          company_period_from: string | null
          company_period_to: string | null
          user_id: string
        }
        Insert: {
          career_id?: string
          company_name?: string | null
          company_period_from?: string | null
          company_period_to?: string | null
          user_id: string
        }
        Update: {
          career_id?: string
          company_name?: string | null
          company_period_from?: string | null
          company_period_to?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "careers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      comments: {
        Row: {
          comment_id: string
          content: string
          created_at: string
          project_apply: boolean | null
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string
          content: string
          created_at?: string
          project_apply?: boolean | null
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string
          content?: string
          created_at?: string
          project_apply?: boolean | null
          project_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      education: {
        Row: {
          education_id: string
          high_school_graduated: string | null
          high_school_name: string | null
          high_school_period_from: string | null
          high_school_period_to: string | null
          university_major: string | null
          university_name: string | null
          university_period_from: string | null
          university_period_to: string | null
          user_id: string
        }
        Insert: {
          education_id?: string
          high_school_graduated?: string | null
          high_school_name?: string | null
          high_school_period_from?: string | null
          high_school_period_to?: string | null
          university_major?: string | null
          university_name?: string | null
          university_period_from?: string | null
          university_period_to?: string | null
          user_id: string
        }
        Update: {
          education_id?: string
          high_school_graduated?: string | null
          high_school_name?: string | null
          high_school_period_from?: string | null
          high_school_period_to?: string | null
          university_major?: string | null
          university_name?: string | null
          university_period_from?: string | null
          university_period_to?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      positions: {
        Row: {
          position_id: string
          position_name: string
        }
        Insert: {
          position_id?: string
          position_name: string
        }
        Update: {
          position_id?: string
          position_name?: string
        }
        Relationships: []
      }
      project_members: {
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
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
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
            referencedColumns: ["position_id"]
          },
          {
            foreignKeyName: "project_position_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      project_regions: {
        Row: {
          region: string | null
          region_id: string
        }
        Insert: {
          region?: string | null
          region_id?: string
        }
        Update: {
          region?: string | null
          region_id?: string
        }
        Relationships: []
      }
      project_tech: {
        Row: {
          id: number
          project_id: string
          tech_id: string | null
        }
        Insert: {
          id?: number
          project_id: string
          tech_id?: string | null
        }
        Update: {
          id?: number
          project_id?: string
          tech_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tech_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_tech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "techs"
            referencedColumns: ["tech_id"]
          },
        ]
      }
      projects: {
        Row: {
          content: string
          created_at: string | null
          is_offline: boolean
          number_of_people: number
          picture_url: string | null
          project_end_date: string
          project_id: string
          project_start_date: string
          recruit_status: string | null
          region_id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          is_offline: boolean
          number_of_people: number
          picture_url?: string | null
          project_end_date: string
          project_id?: string
          project_start_date: string
          recruit_status?: string | null
          region_id: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          is_offline?: boolean
          number_of_people?: number
          picture_url?: string | null
          project_end_date?: string
          project_id?: string
          project_start_date?: string
          recruit_status?: string | null
          region_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "project_regions"
            referencedColumns: ["region_id"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      techs: {
        Row: {
          tech_id: string
          tech_name: string
        }
        Insert: {
          tech_id?: string
          tech_name: string
        }
        Update: {
          tech_id?: string
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
            referencedColumns: ["tech_id"]
          },
          {
            foreignKeyName: "user_tech_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          positionId: string | null
          user_id: string
          user_status: string | null
        }
        Insert: {
          positionId?: string | null
          user_id: string
          user_status?: string | null
        }
        Update: {
          positionId?: string | null
          user_id?: string
          user_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
    : never = never,
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
    : never = never,
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
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

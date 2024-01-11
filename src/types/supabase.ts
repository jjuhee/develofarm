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
      academy: {
        Row: {
          id: string
          name: string | null
          period_from: string | null
          period_to: string | null
          user_id: string
        }
        Insert: {
          id?: string
          name?: string | null
          period_from?: string | null
          period_to?: string | null
          user_id: string
        }
        Update: {
          id?: string
          name?: string | null
          period_from?: string | null
          period_to?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "academy_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          },
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
          },
        ]
      }
      careers: {
        Row: {
          company_name: string | null
          id: string
          period_from: string | null
          period_to: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          id?: string
          period_from?: string | null
          period_to?: string | null
          user_id?: string
        }
        Relationships: []
      }
      certificate: {
        Row: {
          certificate_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          certificate_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          certificate_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          project_apply: boolean | null
          project_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          project_apply?: boolean | null
          project_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
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
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          high_school_graduated: string | null
          high_school_name: string | null
          high_school_period_from: string | null
          high_school_period_to: string | null
          id: string
          university_major: string | null
          university_name: string | null
          university_period_from: string | null
          university_period_to: string | null
          user_id: string
        }
        Insert: {
          high_school_graduated?: string | null
          high_school_name?: string | null
          high_school_period_from?: string | null
          high_school_period_to?: string | null
          id?: string
          university_major?: string | null
          university_name?: string | null
          university_period_from?: string | null
          university_period_to?: string | null
          user_id: string
        }
        Update: {
          high_school_graduated?: string | null
          high_school_name?: string | null
          high_school_period_from?: string | null
          high_school_period_to?: string | null
          id?: string
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
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          id: string
          position_name: string
        }
        Insert: {
          id?: string
          position_name: string
        }
        Update: {
          id?: string
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
            referencedColumns: ["id"]
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
            foreignKeyName: "project_position_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
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
          project_id: string
          tech_id: string | null
        }
        Insert: {
          project_id: string
          tech_id?: string | null
        }
        Update: {
          project_id?: string
          tech_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_offline: boolean
          number_of_people: number
          picture_url: string | null
          project_end_date: string
          project_start_date: string
          recruit_status: string | null
          region_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_offline: boolean
          number_of_people: number
          picture_url?: string | null
          project_end_date: string
          project_start_date: string
          recruit_status?: string | null
          region_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_offline?: boolean
          number_of_people?: number
          picture_url?: string | null
          project_end_date?: string
          project_start_date?: string
          recruit_status?: string | null
          region_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          tech_id: string
          user_id: string
        }
        Insert: {
          tech_id: string
          user_id: string
        }
        Update: {
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
          },
        ]
      }
      users: {
        Row: {
          id: string
          positionId: string | null
          user_status: string | null
        }
        Insert: {
          id: string
          positionId?: string | null
          user_status?: string | null
        }
        Update: {
          id?: string
          positionId?: string | null
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
            foreignKeyName: "users_user_id_fkey"
            columns: ["id"]
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

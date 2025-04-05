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
      repositories: {
        Row: {
          id: number
          owner: string
          repo: string
          last_updated: string
        }
        Insert: {
          id?: number
          owner: string
          repo: string
          last_updated?: string
        }
        Update: {
          id?: number
          owner?: string
          repo?: string
          last_updated?: string
        }
        Relationships: []
      }
      diagrams: {
        Row: {
          id: number
          repository_id: number
          diagram_content: string
          created_at: string
        }
        Insert: {
          id?: number
          repository_id: number
          diagram_content: string
          created_at?: string
        }
        Update: {
          id?: number
          repository_id?: number
          diagram_content?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagrams_repository_id_fkey"
            columns: ["repository_id"]
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          }
        ]
      }
      features: {
        Row: {
          id: number
          repository_id: number
          title: string
          description: string
          matches: number
          created_at: string
        }
        Insert: {
          id?: number
          repository_id: number
          title: string
          description: string
          matches: number
          created_at?: string
        }
        Update: {
          id?: number
          repository_id?: number
          title?: string
          description?: string
          matches?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "features_repository_id_fkey"
            columns: ["repository_id"]
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          }
        ]
      }
      walkthroughs: {
        Row: {
          id: number
          feature_id: number
          title: string
          description: string
          created_at: string
        }
        Insert: {
          id?: number
          feature_id: number
          title: string
          description: string
          created_at?: string
        }
        Update: {
          id?: number
          feature_id?: number
          title?: string
          description?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "walkthroughs_feature_id_fkey"
            columns: ["feature_id"]
            referencedRelation: "features"
            referencedColumns: ["id"]
          }
        ]
      }
      walkthrough_steps: {
        Row: {
          id: number
          walkthrough_id: number
          title: string
          description: string
          files: Json
          code: string
          explanation: string
          step_order: number
          created_at: string
        }
        Insert: {
          id?: number
          walkthrough_id: number
          title: string
          description: string
          files: Json
          code: string
          explanation: string
          step_order: number
          created_at?: string
        }
        Update: {
          id?: number
          walkthrough_id?: number
          title?: string
          description?: string
          files?: Json
          code?: string
          explanation?: string
          step_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "walkthrough_steps_walkthrough_id_fkey"
            columns: ["walkthrough_id"]
            referencedRelation: "walkthroughs"
            referencedColumns: ["id"]
          }
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

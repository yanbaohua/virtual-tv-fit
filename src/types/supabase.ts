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
            tv_models: {
                Row: {
                    id: string
                    name: string
                    subtext: string | null
                    price: string | null
                    image: string | null
                    tag: string | null
                    tag_color: string | null
                    best_dist: string | null
                    is_popular: boolean | null
                    is_best_value: boolean | null
                    specs: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    subtext?: string | null
                    price?: string | null
                    image?: string | null
                    tag?: string | null
                    tag_color?: string | null
                    best_dist?: string | null
                    is_popular?: boolean | null
                    is_best_value?: boolean | null
                    specs?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    subtext?: string | null
                    price?: string | null
                    image?: string | null
                    tag?: string | null
                    tag_color?: string | null
                    best_dist?: string | null
                    is_popular?: boolean | null
                    is_best_value?: boolean | null
                    specs?: string | null
                    created_at?: string
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
}

import { Tables } from '@/shared/types/database.types';

export type InsertCompany = Omit<
    Tables<'companies'>,
    'id' | 'created_at' | 'average_rating' | 'rating' | 'logo_url'
>;

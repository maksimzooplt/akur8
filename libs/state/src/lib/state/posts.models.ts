/**
 * Interface for the 'Posts' data
 */
export interface PostsEntity {
  id: string | number; // Primary ID
  name: string;
  content?: string;
  selected?: boolean
}

export interface EventEntity {
  id: string | number;
  name: string;
  eventTime?: Date;
  eventType?: 'add' | 'delete';
}
import { Post } from "../entities/Post"

export interface IPostRepository{
    create(post: Post): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    findAll(options?: { limit?: number; offset?: number }): Promise<{ posts: Post[]; total: number }>;
    update(id: string, post: Partial<Post>): Promise<Post>;
    delete(id: string): Promise<void>;
}
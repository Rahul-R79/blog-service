import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { Post } from "../../domain/entities/Post";

export class GetPostUseCase {
    constructor(private postRepository: IPostRepository) {}

    async execute(id: string): Promise<Post | null> {
        return await this.postRepository.findById(id);
    }

    async executeAll(options?: { limit?: number; offset?: number }): Promise<{ posts: Post[]; total: number }> {
        const MAX_LIMIT = 100;
        const DEFAULT_LIMIT = 10;
        
        const limit = Math.min(
            Math.max(options?.limit || DEFAULT_LIMIT, 1),
            MAX_LIMIT
        );
        
        const offset = Math.max(options?.offset || 0, 0);
        
        return await this.postRepository.findAll({ limit, offset });
    }
}
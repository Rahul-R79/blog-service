import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { Post, Category } from "../../domain/entities/Post";

export interface UpdatePostRequest {
    id: string;
    userId: string;
    title?: string;
    content?: string;
    image?: string;
    category?: Category;
    readTime?: number;
}

export class UpdatePostUseCase {
    constructor(private postRepository: IPostRepository) {}

    async execute(request: UpdatePostRequest): Promise<Post> {
        const existingPost = await this.postRepository.findById(request.id);

        if (!existingPost) {
            throw new Error("Post not found");
        }

        if (existingPost.authorId !== request.userId) {
            throw new Error("Unauthorized: You are not the author of this post");
        }

        return await this.postRepository.update(request.id, request);
    }
}

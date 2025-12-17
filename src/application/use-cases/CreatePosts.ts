import { Post, Category } from "../../domain/entities/Post";
import { IPostRepository } from "../../domain/repositories/IPostRepository";

export interface CreatePostRequest {
    authorId: string;
    title: string;
    content: string;
    image: string;
    category: Category;
    readTime: number;
}

export class CreatePostUseCase {
    constructor(private postRepository: IPostRepository) {}

    async execute(request: CreatePostRequest): Promise<Post> {
        const newPost: Post = {
            id: crypto.randomUUID(),
            authorId: request.authorId,
            title: request.title,
            content: request.content,
            image: request.image,
            category: request.category,
            readTime: request.readTime,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await this.postRepository.create(newPost);
    }
}
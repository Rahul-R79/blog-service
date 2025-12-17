import { IPostRepository } from "../../domain/repositories/IPostRepository";

export class DeletePostUseCase {
    constructor(private postRepository: IPostRepository) {}

    async execute(id: string, userId: string): Promise<void> {
        const existingPost = await this.postRepository.findById(id);

        if (!existingPost) {
            throw new Error("Post not found");
        }

        if (existingPost.authorId !== userId) {
            throw new Error("Unauthorized: You are not the author of this post");
        }

        await this.postRepository.delete(id);
    }
}

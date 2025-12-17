import { PrismaClient } from "../../../generated/client/client";
import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { Post } from "../../domain/entities/Post";

export class PrismaPostRepository implements IPostRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(post: Post): Promise<Post> {
        const createdPost = await this.prisma.post.create({
            data: {
                id: post.id,
                authorId: post.authorId,
                title: post.title,
                content: post.content,
                image: post.image,
                category: post.category,
                readTime: post.readTime,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            },
        });
        return this.mapToEntity(createdPost);
    }

    async findById(id: string): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({ where: { id } });
        return post ? this.mapToEntity(post) : null;
    }

    async findAll(options?: { limit?: number; offset?: number }): Promise<{ posts: Post[]; total: number }> {
        const { limit, offset } = options || {};
        const [posts, total] = await Promise.all([
            this.prisma.post.findMany({
                take: limit,
                skip: offset,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.post.count()
        ]);
        
        return {
            posts: posts.map((p) => this.mapToEntity(p)),
            total
        };
    }

    async update(id: string, postData: Partial<Post>): Promise<Post> {
        
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: {
                title: postData.title,
                content: postData.content,
                category: postData.category,
                image: postData.image,
                readTime: postData.readTime
            }
        });
        return this.mapToEntity(updatedPost);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.post.delete({ where: { id } });
    }

    private mapToEntity(prismaPost: any): Post {
        return {
            id: prismaPost.id,
            authorId: prismaPost.authorId,
            title: prismaPost.title,
            content: prismaPost.content,
            image: prismaPost.image || undefined, 
            category: prismaPost.category,
            readTime: prismaPost.readTime,
            createdAt: prismaPost.createdAt,
            updatedAt: prismaPost.updatedAt,
        };
    }
}
import { ConnectRouter, ConnectError, Code } from "@connectrpc/connect";
import { z } from "zod";
import { PostService } from "../../../proto/blog/blog_connect";
import {
    CreatePostRequest,
    GetPostRequest,
    EditPostRequest,
    DeletePostRequest,
    ListPostsRequest,
    CreatePostResponse,
    GetPostResponse,
    ListPostsResponse,
    EditPostResponse,
    DeletePostResponse,
    UploadUrlResponse,
    UploadUrlRequest,
} from "../../../proto/blog/blog_pb";
import { CreatePostUseCase } from "../../application/use-cases/CreatePosts";
import { GetPostUseCase } from "../../application/use-cases/GetPosts";
import { UpdatePostUseCase } from "../../application/use-cases/UpdatePosts";
import { GenerateUploadUrlUseCase } from "../../application/use-cases/GenerateUploadUrl";
import { DeletePostUseCase } from "../../application/use-cases/DeletePosts";

import { Post } from "../../domain/entities/Post";
import { Timestamp } from "@bufbuild/protobuf";

import { createPostSchema, editPostSchema, formatZodError } from "../validators/PostValidator";

export const blogServiceHandler = (
    router: ConnectRouter,
    useCases: {
        createPost: CreatePostUseCase;
        getPost: GetPostUseCase;
        updatePost: UpdatePostUseCase;
        deletePost: DeletePostUseCase;
        generateUploadUrl: GenerateUploadUrlUseCase;
    }
) => {
    router.service(PostService, {
        async createPost(req: CreatePostRequest) {
            try {
                const validateData = createPostSchema.parse({
                    authorId: req.authorId,
                    title: req.title,
                    content: req.content,
                    image: req.image,
                    category: req.category,
                    readTime: req.readTime,
                });

                const post = await useCases.createPost.execute({
                    authorId: validateData.authorId,
                    title: validateData.title,
                    content: validateData.content,
                    image: validateData.image,
                    category: validateData.category,
                    readTime: validateData.readTime,
                });
                return new CreatePostResponse({
                    id: post.id,
                    createdAt: Timestamp.fromDate(post.createdAt),
                });
            } catch (error: any) {
                if (error instanceof z.ZodError) {
                    const validationError = formatZodError(error);
                    const err = new ConnectError("Validation Failed", Code.InvalidArgument);
                    err.metadata.set("validation-errors", JSON.stringify(validationError));
                    throw err;
                }
                throw new ConnectError("Failed to create post", Code.Internal);
            }
        },

        async getPost(req: GetPostRequest) {
            const post = await useCases.getPost.execute(req.id);
            if (!post) {
                throw new ConnectError("Post not found", Code.NotFound);
            }
            return mapToProto(post);
        },

        async listPosts(req: ListPostsRequest) {
            const result = await useCases.getPost.executeAll({
                limit: req.limit,
                offset: req.offset,
            });
            return new ListPostsResponse({
                posts: result.posts.map(mapToProto),
                totalCount: result.total,
            });
        },

        async editPost(req: EditPostRequest) {
            try {
                const validateData = editPostSchema.parse({
                    id: req.id,
                    title: req.title,
                    content: req.content,
                    image: req.image,
                    category: req.category,
                    readTime: req.readTime,
                });

                const post = await useCases.updatePost.execute({
                    id: validateData.id,
                    userId: req.userId,
                    title: validateData.title,
                    content: validateData.content,
                    image: validateData.image,
                    category: validateData.category,
                    readTime: validateData.readTime,
                });
                return new EditPostResponse({
                    id: post.id,
                });
            } catch (error: any) {
                if (error instanceof z.ZodError) {
                    const validationError = formatZodError(error);
                    const err = new ConnectError("Validation Failed", Code.InvalidArgument);
                    err.metadata.set("validation-errors", JSON.stringify(validationError));
                    throw err;
                }
                throw new ConnectError("Failed to update post", Code.Internal);
            }
        },

        async deletePost(req: DeletePostRequest) {
            await useCases.deletePost.execute(req.id, req.userId);
            return new DeletePostResponse({});
        },

        async requestUploadUrl(req: UploadUrlRequest) {
            try {
                const result = await useCases.generateUploadUrl.execute(
                    req.filename,
                    req.contentType
                );

                return new UploadUrlResponse({
                    uploadUrl: result.uploadUrl,
                    publicUrl: result.publicUrl,
                });
            } catch (error) {
                throw new ConnectError("Failed to generate upload URL", Code.Internal);
            }
        },
    });
};

function mapToProto(post: Post): GetPostResponse {
    return new GetPostResponse({
        id: post.id,
        authorId: post.authorId,
        title: post.title,
        content: post.content,
        image: post.image,
        category: post.category,
        readTime: post.readTime,
        createdAt: Timestamp.fromDate(post.createdAt),
        updatedAt: Timestamp.fromDate(post.updatedAt),
    });
}

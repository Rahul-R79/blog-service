import dotenv from 'dotenv';
import { createServer } from "http";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { blogServiceHandler } from "./presentation/grpc/BlogService";
import { S3StorageService } from './infrastructure/services/S3StorageService';
import { PrismaPostRepository } from "./infrastructure/repositories/PrismaPostRepository";
import { CreatePostUseCase } from "./application/use-cases/CreatePosts";
import { GetPostUseCase } from "./application/use-cases/GetPosts";
import { UpdatePostUseCase } from "./application/use-cases/UpdatePosts";
import { DeletePostUseCase } from "./application/use-cases/DeletePosts";
import { GenerateUploadUrlUseCase } from './application/use-cases/GenerateUploadUrl';
import { prisma, ConnectDB } from "./infrastructure/config/database";

async function main() {
    dotenv.config();
    await ConnectDB();

    const postRepository = new PrismaPostRepository(prisma);
    const storageService = new S3StorageService();

    const createPost = new CreatePostUseCase(postRepository);
    const getPost = new GetPostUseCase(postRepository);
    const updatePost = new UpdatePostUseCase(postRepository);
    const deletePost = new DeletePostUseCase(postRepository);
    const generateUploadUrl = new GenerateUploadUrlUseCase(storageService);

    const handler = connectNodeAdapter({
        routes: (router) => {
            blogServiceHandler(router, {
                createPost,
                getPost,
                updatePost,
                deletePost,
                generateUploadUrl
            });
        },
    });

    const server = createServer(handler);

    const PORT = Number(process.env.PORT || 5002);

    server.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Blog Service running on http://0.0.0.0:${PORT}`);
    });

    const shutdown = async () => {
        console.log("Shutting down...");
        server.close();
        await prisma.$disconnect();
        console.log("Cleanup finished.");
        process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}

main().catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
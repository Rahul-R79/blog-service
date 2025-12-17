import { S3StorageService } from "../../infrastructure/services/S3StorageService";

export class GenerateUploadUrlUseCase {
    constructor(private storageService: S3StorageService) {}

    async execute(filename: string, contentType: string) {
        if (!filename || !contentType) {
            throw new Error("Filename and Content-Type are required");
        }
        return await this.storageService.generateUploadUrls(filename, contentType);
    }
}
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3StorageService {
    private s3: S3Client;
    private bucket: string;
    private cdnDomain: string;

    constructor() {
        this.bucket = process.env.AWS_BUCKET_NAME!;
        this.cdnDomain = process.env.CLOUDFRONT_DOMAIN!;
        
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async generateUploadUrls(filename: string, contentType: string) {
        const key = `uploads/${crypto.randomUUID()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });

        const domain = 'https://'+this.cdnDomain;
        const publicUrl = `${domain}/${key}`;

        return { uploadUrl, publicUrl };
    }
}
import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
/**
 * @generated from enum blog.Category
 */
export declare enum Category {
    /**
     * @generated from enum value: UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TECHNOLOGY = 1;
     */
    TECHNOLOGY = 1,
    /**
     * @generated from enum value: DEVELOPMENT = 2;
     */
    DEVELOPMENT = 2,
    /**
     * @generated from enum value: DESIGN = 3;
     */
    DESIGN = 3,
    /**
     * @generated from enum value: LIFESTYLE = 4;
     */
    LIFESTYLE = 4,
    /**
     * @generated from enum value: CAREER = 5;
     */
    CAREER = 5
}
/**
 * @generated from message blog.CreatePostRequest
 */
export declare class CreatePostRequest extends Message<CreatePostRequest> {
    /**
     * @generated from field: string author_id = 1;
     */
    authorId: string;
    /**
     * @generated from field: string title = 2;
     */
    title: string;
    /**
     * @generated from field: string content = 3;
     */
    content: string;
    /**
     * @generated from field: string image = 4;
     */
    image: string;
    /**
     * @generated from field: blog.Category category = 5;
     */
    category: Category;
    /**
     * @generated from field: int32 read_time = 6;
     */
    readTime: number;
    constructor(data?: PartialMessage<CreatePostRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.CreatePostRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePostRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePostRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePostRequest;
    static equals(a: CreatePostRequest | PlainMessage<CreatePostRequest> | undefined, b: CreatePostRequest | PlainMessage<CreatePostRequest> | undefined): boolean;
}
/**
 * @generated from message blog.CreatePostResponse
 */
export declare class CreatePostResponse extends Message<CreatePostResponse> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 2;
     */
    createdAt?: Timestamp;
    constructor(data?: PartialMessage<CreatePostResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.CreatePostResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePostResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePostResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePostResponse;
    static equals(a: CreatePostResponse | PlainMessage<CreatePostResponse> | undefined, b: CreatePostResponse | PlainMessage<CreatePostResponse> | undefined): boolean;
}
/**
 * @generated from message blog.GetPostRequest
 */
export declare class GetPostRequest extends Message<GetPostRequest> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    constructor(data?: PartialMessage<GetPostRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.GetPostRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostRequest;
    static equals(a: GetPostRequest | PlainMessage<GetPostRequest> | undefined, b: GetPostRequest | PlainMessage<GetPostRequest> | undefined): boolean;
}
/**
 * @generated from message blog.GetPostResponse
 */
export declare class GetPostResponse extends Message<GetPostResponse> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string author_id = 2;
     */
    authorId: string;
    /**
     * @generated from field: string title = 3;
     */
    title: string;
    /**
     * @generated from field: string content = 4;
     */
    content: string;
    /**
     * @generated from field: string image = 5;
     */
    image: string;
    /**
     * @generated from field: blog.Category category = 6;
     */
    category: Category;
    /**
     * @generated from field: int32 read_time = 7;
     */
    readTime: number;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 8;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 9;
     */
    updatedAt?: Timestamp;
    constructor(data?: PartialMessage<GetPostResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.GetPostResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPostResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPostResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPostResponse;
    static equals(a: GetPostResponse | PlainMessage<GetPostResponse> | undefined, b: GetPostResponse | PlainMessage<GetPostResponse> | undefined): boolean;
}
/**
 * @generated from message blog.ListPostsRequest
 */
export declare class ListPostsRequest extends Message<ListPostsRequest> {
    /**
     * @generated from field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from field: int32 offset = 2;
     */
    offset: number;
    constructor(data?: PartialMessage<ListPostsRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.ListPostsRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPostsRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPostsRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPostsRequest;
    static equals(a: ListPostsRequest | PlainMessage<ListPostsRequest> | undefined, b: ListPostsRequest | PlainMessage<ListPostsRequest> | undefined): boolean;
}
/**
 * @generated from message blog.ListPostsResponse
 */
export declare class ListPostsResponse extends Message<ListPostsResponse> {
    /**
     * @generated from field: repeated blog.GetPostResponse posts = 1;
     */
    posts: GetPostResponse[];
    /**
     * @generated from field: int32 total_count = 2;
     */
    totalCount: number;
    constructor(data?: PartialMessage<ListPostsResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.ListPostsResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPostsResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPostsResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPostsResponse;
    static equals(a: ListPostsResponse | PlainMessage<ListPostsResponse> | undefined, b: ListPostsResponse | PlainMessage<ListPostsResponse> | undefined): boolean;
}
/**
 * @generated from message blog.DeletePostRequest
 */
export declare class DeletePostRequest extends Message<DeletePostRequest> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string userId = 2;
     */
    userId: string;
    constructor(data?: PartialMessage<DeletePostRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.DeletePostRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePostRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePostRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePostRequest;
    static equals(a: DeletePostRequest | PlainMessage<DeletePostRequest> | undefined, b: DeletePostRequest | PlainMessage<DeletePostRequest> | undefined): boolean;
}
/**
 * @generated from message blog.DeletePostResponse
 */
export declare class DeletePostResponse extends Message<DeletePostResponse> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    constructor(data?: PartialMessage<DeletePostResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.DeletePostResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePostResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePostResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePostResponse;
    static equals(a: DeletePostResponse | PlainMessage<DeletePostResponse> | undefined, b: DeletePostResponse | PlainMessage<DeletePostResponse> | undefined): boolean;
}
/**
 * @generated from message blog.EditPostRequest
 */
export declare class EditPostRequest extends Message<EditPostRequest> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string userId = 2;
     */
    userId: string;
    /**
     * @generated from field: string title = 3;
     */
    title: string;
    /**
     * @generated from field: string content = 4;
     */
    content: string;
    /**
     * @generated from field: blog.Category category = 5;
     */
    category: Category;
    /**
     * @generated from field: string image = 6;
     */
    image: string;
    /**
     * @generated from field: int32 read_time = 7;
     */
    readTime: number;
    constructor(data?: PartialMessage<EditPostRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.EditPostRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditPostRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditPostRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditPostRequest;
    static equals(a: EditPostRequest | PlainMessage<EditPostRequest> | undefined, b: EditPostRequest | PlainMessage<EditPostRequest> | undefined): boolean;
}
/**
 * @generated from message blog.EditPostResponse
 */
export declare class EditPostResponse extends Message<EditPostResponse> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    constructor(data?: PartialMessage<EditPostResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.EditPostResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditPostResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditPostResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditPostResponse;
    static equals(a: EditPostResponse | PlainMessage<EditPostResponse> | undefined, b: EditPostResponse | PlainMessage<EditPostResponse> | undefined): boolean;
}
/**
 * @generated from message blog.UploadUrlRequest
 */
export declare class UploadUrlRequest extends Message<UploadUrlRequest> {
    /**
     * @generated from field: string filename = 1;
     */
    filename: string;
    /**
     * @generated from field: string content_type = 2;
     */
    contentType: string;
    constructor(data?: PartialMessage<UploadUrlRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.UploadUrlRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UploadUrlRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UploadUrlRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UploadUrlRequest;
    static equals(a: UploadUrlRequest | PlainMessage<UploadUrlRequest> | undefined, b: UploadUrlRequest | PlainMessage<UploadUrlRequest> | undefined): boolean;
}
/**
 * @generated from message blog.UploadUrlResponse
 */
export declare class UploadUrlResponse extends Message<UploadUrlResponse> {
    /**
     * @generated from field: string upload_url = 1;
     */
    uploadUrl: string;
    /**
     * @generated from field: string public_url = 2;
     */
    publicUrl: string;
    constructor(data?: PartialMessage<UploadUrlResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "blog.UploadUrlResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UploadUrlResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UploadUrlResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UploadUrlResponse;
    static equals(a: UploadUrlResponse | PlainMessage<UploadUrlResponse> | undefined, b: UploadUrlResponse | PlainMessage<UploadUrlResponse> | undefined): boolean;
}
//# sourceMappingURL=blog_pb.d.ts.map
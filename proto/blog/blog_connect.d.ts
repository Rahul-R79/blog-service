import { CreatePostRequest, CreatePostResponse, DeletePostRequest, DeletePostResponse, EditPostRequest, EditPostResponse, GetPostRequest, GetPostResponse, ListPostsRequest, ListPostsResponse, UploadUrlRequest, UploadUrlResponse } from "./blog_pb";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service blog.PostService
 */
export declare const PostService: {
    readonly typeName: "blog.PostService";
    readonly methods: {
        /**
         * @generated from rpc blog.PostService.CreatePost
         */
        readonly createPost: {
            readonly name: "CreatePost";
            readonly I: typeof CreatePostRequest;
            readonly O: typeof CreatePostResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc blog.PostService.GetPost
         */
        readonly getPost: {
            readonly name: "GetPost";
            readonly I: typeof GetPostRequest;
            readonly O: typeof GetPostResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc blog.PostService.ListPosts
         */
        readonly listPosts: {
            readonly name: "ListPosts";
            readonly I: typeof ListPostsRequest;
            readonly O: typeof ListPostsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc blog.PostService.DeletePost
         */
        readonly deletePost: {
            readonly name: "DeletePost";
            readonly I: typeof DeletePostRequest;
            readonly O: typeof DeletePostResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc blog.PostService.EditPost
         */
        readonly editPost: {
            readonly name: "EditPost";
            readonly I: typeof EditPostRequest;
            readonly O: typeof EditPostResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc blog.PostService.RequestUploadUrl
         */
        readonly requestUploadUrl: {
            readonly name: "RequestUploadUrl";
            readonly I: typeof UploadUrlRequest;
            readonly O: typeof UploadUrlResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=blog_connect.d.ts.map
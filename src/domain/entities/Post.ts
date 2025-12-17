export enum Category {
    UNSPECIFIED,
    TECHNOLOGY,
    DEVELOPMENT,
    DESIGN,
    LIFESTYLE,
    CAREER
}

export interface Post {
    id: string;
    authorId: string;
    title: string;
    content: string;
    image: string;
    category: Category;
    readTime: number;
    createdAt: Date;
    updatedAt: Date;
}

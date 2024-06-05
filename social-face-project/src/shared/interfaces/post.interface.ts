export interface Post {
    id: string;
    userId: string;
    content: string;
    imageUrl: string;
    likes: number;
    comments: string[];
    createdAt: string;
}
import { Comment } from "./comment.interface";

export interface Post {
    id: string;
    userId: string;
    content: string;
    imageUrl: string;
    likes: number;
    comments: Comment[];
    createdAt: string;
}
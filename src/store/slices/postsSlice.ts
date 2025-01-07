import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
    text: string; 
    date: string; 
    time: string; 
}

export interface Post {
    title: string;
    id: number;
    image: string;
    body: string;
    date: string;
    comments: Comment[]; 
}

interface PostsState {
    posts: Post[];
    lastId: number;
}

const initialState: PostsState = {
    posts: [],
    lastId: 0,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: (state, action: PayloadAction<Post[]>) => {
            const newPosts = action.payload.filter(newPost => 
                !state.posts.some(existingPost => existingPost.id === newPost.id)
            );
            state.posts.push(...newPosts);
            state.lastId = Math.max(state.lastId, ...newPosts.map(post => post.id));
        },
        addComment: (state, action: PayloadAction<{ postId: number; comment: Comment }>) => {
            const post = state.posts.find(post => post.id === action.payload.postId);
            if (post) {
                post.comments.push(action.payload.comment); // Добавляем объект комментария
            }
        },
        deleteComment: (state, action: PayloadAction<{ postId: number; commentIndex: number }>) => {
            const post = state.posts.find(post => post.id === action.payload.postId);
            if (post) {
                post.comments.splice(action.payload.commentIndex, 1);
            }
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
    },
});

export const { addPosts, addComment, deleteComment, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
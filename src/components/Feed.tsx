import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../store/slices/postsSlice';
import FeedItem, { Post } from './FeedItem';
import Header from './Header';
import axiosInstance from '../axiosInstance';
import styles from '../styles/Feed.module.css';

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: any) => state.posts.posts) as Post[];
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await axiosInstance.get('/cdeb6c5b-1b40-4af5-a21c-8ed15f45b32d');
                // Добавляем пустой массив комментариев к каждому посту
                const postsWithComments = response.data.map((post: Post) => ({
                    ...post,
                    comments: [] 
                }));
                dispatch(addPosts(postsWithComments)); 
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [dispatch]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post: Post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <main className={styles.feed}>
            <Header onSearch={setSearchTerm} />
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    <FeedItem key={post.id} post={post} />
                ))
            ) : (
                <h2>Oops!.. No posts found :(</h2>
            )}
        </main>
    );
};

export default Feed;
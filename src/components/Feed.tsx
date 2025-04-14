// src/components/Feed.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../store/slices/postsSlice';
import FeedItem, { Post } from './FeedItem';
import Header from './Header';
import postsData from '../constants/post';
import styles from '../styles/Feed.module.css';

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: any) => state.posts.posts) as Post[];
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = () => {
            if (posts.length === 0) {
                setTimeout(() => {
                    dispatch(addPosts(postsData));
                    setLoading(false);
                }, 1500);
            } else {
                setLoading(false);
            }
        };

        loadPosts();
    }, [dispatch, posts.length]);

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
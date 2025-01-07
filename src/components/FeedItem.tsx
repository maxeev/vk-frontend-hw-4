import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FeedItem.module.css';

export interface Post {
    title: string;
    id: number;
    image: string;
    body: string;
    date: string;
}

interface FeedItemProps {
    post: Post;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/post/${post.id}`);
    };

    const toggleBody = () => {
        setIsOpen(prev => !prev); 
    };

    const bodyWords = post.body.split(' ');
    const isLongPost = bodyWords.length > 5; 
    const displayedBody = isOpen || !isLongPost ? post.body : bodyWords.slice(0, 5).join(' ') + '...';

    return (
        <div className={styles.feedItem}>
            <div className={styles.title}>
                <h3>{post.title}</h3>
                <p className={styles.date}>{post.date}</p> 
            </div>
            <span>
                {displayedBody}
                {isLongPost && ( 
                    <span 
                        className={styles.toggleButton} 
                        onClick={toggleBody} 
                        role="button" 
                        tabIndex={0} 
                        onKeyPress={(e) => e.key === 'Enter' && toggleBody()} 
                    >
                        {isOpen ? 'see less' : 'see more'}
                    </span>
                )}
            </span>
            <img className={styles.img} src={post.image} alt="post" />
            <div className={styles.buttonContainer}>
                <button onClick={handleOpen}>Открыть</button>
            </div>
        </div>
    );
};

export default FeedItem;
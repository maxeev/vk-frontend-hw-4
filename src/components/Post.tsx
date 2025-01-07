import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { Post as PostType, addComment, deleteComment, deletePost } from '../store/slices/postsSlice';
import styles from '../styles/Post.module.css';

const Post: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const posts = useSelector((state: AppState) => state.posts.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const postIdNumber = Number(postId);
    const foundPost = posts.find((post: PostType) => post.id === postIdNumber);

    const [commenterName, setCommenterName] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddComment = () => {
        if (commenterName.trim() && comment.trim()) {
            const date = new Date();
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            dispatch(addComment({ 
                postId: foundPost!.id, 
                comment: { 
                    text: `${commenterName}: ${comment}`, 
                    date: formattedDate, 
                    time: formattedTime 
                } 
            }));
            setCommenterName('');
            setComment('');
        }
    };

    const handleDeleteComment = (index: number) => {
        if (foundPost) {
            dispatch(deleteComment({ postId: foundPost.id, commentIndex: index }));
        }
    };

    const handleDeletePost = () => {
        if (foundPost) {
            dispatch(deletePost(foundPost.id));
            navigate('/');
        }
    };

    if (!foundPost) {
        return <h2>Oops!.. Post not found :(</h2>;
    }

    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <img src="/src/assets/icon-feed.png" alt="Feed Icon" className={styles.icon} />
                    <h3 className={styles.feed}>Maksim's Feed</h3>
                </div>
                <Link to="/create" className={styles.createPostButton}>Создать пост</Link>
                <Link to="/" className={styles.backButton}>Вернуться в ленту новостей</Link>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{foundPost.title}</h1>
                <button onClick={handleDeletePost} className={styles.deleteButton}>
                    <img src="/src/assets/icon-can.png" alt="Удалить пост" style={{ width: '24px', height: '24px' }} />
                </button>
            </div>
            <p className={styles.date}>{foundPost.date}</p>
            <p>{foundPost.body}</p>
            <img src={foundPost.image} alt="post" className={styles.img} />
            <hr className={styles.separator} />
            <h3 className={styles.commentsTitle}>Комментарии</h3>
            <div>
                {foundPost.comments.map((c, index) => (
                    <div key={index} className={styles.commentContainer}>
                        <p className={styles.commentText}>{c.text}</p>
                        <div className={styles.commentDateTime}>
                            <span>{c.date} {c.time}</span>
                            <button onClick={() => handleDeleteComment(index)} className={styles.commentDeleteButton}>
                                <img src="/src/assets/icon-can.png" alt="Удалить комментарий" style={{ width: '18px', height: '18px' }} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.commentFormContainer}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ваш комментарий"
                    className={styles.commentInput}
                    style={{ resize: 'none' }} 
                />
                <input
                    type="text"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    placeholder="Ваше имя"
                    className={styles.nameInput} />
                <button onClick={handleAddComment} className={styles.submitButton}>Отправить</button>
            </div>
        </div>
    );
};

export default Post;
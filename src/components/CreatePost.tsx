import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPosts } from '../store/slices/postsSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/CreatePost.module.css';

const CreatePost: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на непустоту заголовка, тела и ссылки на картинку
        if (title.trim() === '' || body.trim() === '' || image.trim() === '') {
            alert('Пожалуйста, заполните все поля.'); // Сообщение об ошибке
            return;
        }

        const newPost = {
            id: Date.now(), // Используем текущее время как уникальный ID
            title,
            body,
            image,
            date: new Date().toISOString().split('T')[0], 
            comments: [], 
        };
        dispatch(addPosts([newPost])); 
        navigate('/'); 
    };

    return (
        <div className={styles.createPostContainer}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <img src="/src/assets/icon-feed.png" alt="Feed Icon" className={styles.icon} />
                    <h3 className={styles.feed}>Maksim's Feed</h3>
                </div>
                <Link to="/" className={styles.backButton}>Вернуться в ленту новостей</Link>
            </div>
            <h1 className={styles.formTitle}>Создание поста</h1> 
            <form onSubmit={handleSubmit} className={styles.createPostForm}>
                <input
                    type="text"
                    id="post-title" 
                    name="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок"
                    required
                />
                <textarea
                    id="post-body" 
                    name="body" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Тело поста"
                    required
                    rows={4} 
                />
                <input
                    type="text"
                    id="post-image" 
                    name="image" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Ссылка на картинку"
                    required
                />
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.createButton}>Создать</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
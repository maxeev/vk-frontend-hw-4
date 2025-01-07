import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

interface HeaderProps {
    onSearch: (searchTerm: string) => void; 
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <header className={styles.header}>
            <div className={styles.titleContainer}>
                <img src="/src/assets/icon-feed.png" alt="Feed Icon" className={styles.icon} />
                <h3 className={styles.title}>Maksim's Feed</h3>
            </div>
            <Link to="/create" className={styles.createPostButton}>
                Создать пост
            </Link>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Поиск по заголовкам"
                    className={styles.searchInput}
                />
                <img
                    src="/src/assets/icon-loupe.png" 
                    alt="Search Icon"
                    className={styles.searchIcon}
                    style={{ width: '20px', height: '20px' }} 
                />
            </div>
        </header>
    );
};

export default Header;


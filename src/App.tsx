import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { Provider } from 'react-redux';
import store from './store';
import styles from './styles/App.module.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className={styles.app}> 
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/post/:postId" element={<Post />} />
                        <Route path="/create" element={<CreatePost />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
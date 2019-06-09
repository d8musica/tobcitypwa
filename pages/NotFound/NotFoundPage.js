import React from 'react';
import { Link } from 'react-router';
import notFound from './notfound.png';

import styles from './NotFound.css';

const NotFoundPage = () => {
  return (
    <div className={styles['not-found-container']}>
      <h1 className={styles['nf-text']}>Oooops, The route you are looking for was not found.</h1>
      <h3 className={styles['nf-text']}>Please try again</h3>
      <p>Regresa al<Link to="/"> Home </Link></p>
      <img className={styles['not-found-img']} src={notFound} alt="Not Found" />
    </div>
  );
};

export default NotFoundPage;

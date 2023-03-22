import React from 'react';
import gif from '../../common/videos/page-not-found .gif'
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css'

const NotFound: React.FC = () => {
    return (
        <div className={classes.NotFound}>
            <h1 className={classes.Title}>
                Ooops, the Anime you are looking for is currently unavailable :(
            </h1>

            <div>
                <img src={gif} alt='gif' />
            </div>

            <Link to='/'>
                <button className={classes.Button}>
                    Return to HomePage
                </button>
            </Link>

        </div>

    )
}

export default NotFound
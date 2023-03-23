import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Cover.module.css';


interface Props {
    title: string
    frontCoverImage: string
    _id: string
}

const Cover: React.FC<Props> = (props) => {
    const { title, frontCoverImage, _id } = props;
    const imgUrl = new URL(`/src/${frontCoverImage}`, import.meta.url).href

    return (
        <Link to={`/anime/${_id}`} className={classes.Cover}>
            <img src={imgUrl} alt={title} />
        </Link>
    );
}

export default Cover;
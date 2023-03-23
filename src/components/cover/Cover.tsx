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
    const image = require(`../../assets/img/${frontCoverImage}`).default;

    return (
        <Link to={`/anime/${_id}`} className={classes.Cover}>
            <img src={image} alt={title} />
        </Link>
    );
}

export default Cover;
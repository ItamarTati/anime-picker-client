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
    return (
        <Link to={`/anime/${_id}`} className={classes.Cover}>
            <img src={`/src/${frontCoverImage}`} alt={title} />
        </Link>
    );
}

export default Cover;
import React, { useEffect, useState } from 'react';
import { Navigate , Link, useParams } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import classes from './Details.module.css';
import { Show } from '../../components/shows/Shows'

export default function Details() {
  const { _id } = useParams();
  const [show, setShow] = useState<Show>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const backgroundImage = new URL(`/src/${show?.backgroundImage}`, import.meta.url).href
  const backCoverImage = new URL(`/src/${show?.backCoverImage}`, import.meta.url).href

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://tame-puce-sawfish-coat.cyclic.app/api/shows/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch show');
        }
        const showData = await response.json();
        setShow(showData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchShow();
  }, [_id]);

  if (loading) return <Loading />;
  if (error) return <Navigate to='not-found' />;

  return (
    <div className={classes.Container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={classes.Content}>
        <h1>
          {show?.title} by {show?.author}
        </h1>
        <p className={classes.Subtitle}>
          <strong>{show?.description}</strong>
        </p>
        <div className={classes.Video}>
          <video controls poster={`${backCoverImage}`}>
            <source src={show?.trailer} type='video/mp4' />
          </video>
        </div>
        <ul className={classes.List}>
          <li>Genres: {show?.genres && show?.genres.join(', ')}</li>
          {show?.hasEnded === true ? (
            <li>Number of Episodes: {show?.numberOfEpisodes}</li>
          ) : (
            <li>
              Number of Episodes: Ongoing with {show?.numberOfEpisodes} Episodes
            </li>
          )}
          <li>Number of Manga Volumes: {show?.mangaChapters}</li>
          {show?.isDubbed === true ? (
            <li>English Dub: &#9989;</li>
          ) : (
            <li>English Dub: &#x274C;</li>
          )}
          <li>
            The Anime was Released{' '}
            {show?.animeReleaseDate &&
              `${new Date().getFullYear() -
                new Date(show.animeReleaseDate).getFullYear()} Years ago in ${
                new Date(show.animeReleaseDate).getFullYear()
              }`}
          </li>
        </ul>

        <Link to='/'>
          <button className={classes.Button}>Go to HomePage</button>
        </Link>
      </div>
    </div>
  );
}
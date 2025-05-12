import React, { useContext } from 'react'
import client from '../client'
import { FavListContext } from '../Context/FavListContext'
import useUser from '../hooks/useUser'
import { getImgUrl } from '../utils'
import MovieCard from './MovieCard'
import MovieGrid from './MovieGrid.jsx'

const MovieList = ({
  movies
}) => {
  const { user } = useUser();
  const { favListMap, setFavListMap } = useContext(FavListContext);
  const handleToggleFavorite = (id) => {
    if (!user) {
      return;
    }
    client.post(`/account/${user.accountId}/favorite`, {
      media_type: "movie",
      media_id: id,
      favorite: !Boolean(favListMap[id])
    }).then(() => {
      setFavListMap({ ...favListMap, [id]: !Boolean(favListMap[id]) })
    });
  }
  return (
    <MovieGrid>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            id={movie.id}
            imgSrc={getImgUrl(movie.poster_path)}
            title={movie.title}
            rating={movie.vote_average}
            favorite={favListMap[movie.id]}
            myRating={movie.rating}
            onToggleFavorite={handleToggleFavorite}
          />
        )
      })}
    </MovieGrid>
  )
}

export default MovieList

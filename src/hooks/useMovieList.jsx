import { useContext } from 'react';
import useLoading from '../hooks/useLoading';
import client from '../client';
import { MovieListContext } from '../Context/MovieListsContext';

const useMovieList = () => {
  const { movieListMap, setMovieListMap } = useContext(MovieListContext);
  const { loading, fetchData, setLoading } = useLoading();

  const getList = (category, page) => {
    if (movieListMap[category] && movieListMap[category][page]) {
      setLoading(false);
      return Promise.resolve(movieListMap[category][page]);
    } else {
      return fetchData(client.get(`movie/${category}`, { params: { page } })
        .then(({ data }) => {
          const info = {
            movies: data.results,
            totalPages: data.total_pages
          };
          setMovieListMap((map) => {
            return {
              ...map,
              [category]: {
                ...map[category],
                [page]: info
              }
            };
          })
          return info;
        }))
    }
  }

  return {
    loading,
    getList
  }
}

export default useMovieList;
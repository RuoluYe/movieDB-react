import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import useMovieList from '../hooks/useMovieList';


const HomeMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('now_playing')
  const [totalPages, setTotalPages] = useState(1);
  const { loading, getList } = useMovieList()
  useEffect(() => {
    getList(category, currentPage).then(({ movies, totalPages }) => {
      setMovies(movies);
      setTotalPages(totalPages);
    });
  }, [getList, category, currentPage, setMovies, setTotalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    getList(category, 1).then(({ movies, totalPages }) => {
      setCurrentPage(1);
      setMovies(movies);
      setCategory(e.target.value);
      setTotalPages(totalPages)
    })
  }
  return (
    <Box px={5}>
      <Box my={3} display='grid' gridTemplateColumns="repeat(3, 1fr)" style={{ placeItems: 'stretch' }}>
        <Box gridColumn="2/3" width="100%">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPrev={handlePageChange}
            onNext={handlePageChange}
          />
        </Box>
        <Box gridColumn="3/4" display="flex" flexDirection="row-reverse">
          <FormControl>
            <InputLabel >Category</InputLabel>
            <Select
              id="demo-simple-select-outlined"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
              autoWidth
            >
              <MenuItem value="popular">Popular</MenuItem>
              <MenuItem value="now_playing">Now Playing</MenuItem>
              <MenuItem value="top_rated">Top Rated</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        {loading && (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>)}
        {!loading && <MovieList movies={movies} />}
      </Box>
    </Box>
  )
}

export default HomeMovieList

import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import client from '../client'
import MovieList from '../components/MovieList'
import useLoading from '../hooks/useLoading'
import useUser from '../hooks/useUser'

const AccountList = (props) => {
  const { fetchData } = useLoading();
  const [movies, setMovies] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      return
    }
    fetchData(client.get(`/account/${user.accountId}/${props.type}/movies`).then(({ data }) => {
      const { results } = data;
      setMovies(results);
    }))
  }, [user, props.type, fetchData]);
  const validList = movies.filter(({ id }) => props.listMap[id]);
  return (
    <Box p={5}>
      <Typography variant="h3" align="center">{props.title}</Typography>
      <MovieList movies={validList} />
    </Box>
  )
}

export default AccountList

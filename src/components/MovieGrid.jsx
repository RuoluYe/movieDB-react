import { Box } from '@mui/material'
import React from 'react'

const MovieGrid = (props) => {
  return (
    <Box display="grid" gridTemplateColumns={'repeat(4, 1fr)'} gap={5} {...props} />
  )
}

export default MovieGrid

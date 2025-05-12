import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState, useContext } from "react";
import client from "../client";
import useLoading from "../hooks/useLoading";
import { getImgUrl } from "../utils";
import _ from "lodash";
import { RatedListContext } from "../Context/RatedListContext";
import { useParams } from "react-router-dom";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [openSnakeBar, setOpenSnakeBar] = React.useState(false);
  const [rateValue, setRateValue] = useState(1);
  const { ratedListMap, setRatedListMap } = useContext(RatedListContext);
  const { movieId } = useParams();
  const { loading, fetchData } = useLoading();
  useEffect(() => {
    fetchData(
      client.get(`/movie/${movieId}`).then(({ data }) => {
        setMovie(data);
      })
    );
  }, [fetchData, movieId]);

  const handleRate = () => {
    client
      .post(`https://api.themoviedb.org/3/movie/${movieId}/rating`, {
        value: Number(rateValue),
      })
      .then(() => {
        setRatedListMap({ ...ratedListMap, [movieId]: Number(rateValue) });
        setOpenSnakeBar(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakeBar(false);
  };
  return (
    <Box
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      mx={16}
    >
      {loading && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        style={{ backgroundColor: "green" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={openSnakeBar}
        onClose={handleClose}
        key={"I love snacks"}
      >
        <Alert onClose={handleClose} severity="success">
          Rate Success
        </Alert>
      </Snackbar>
      {!loading && (
        <Box display="flex">
          <img
            src={getImgUrl(movie.poster_path)}
            alt={movie.title}
            style={{ width: "400px", flexBasis: "50%" }}
          />
          <Box ml={4}>
            <Typography variant="h3">{movie.title}</Typography>
            <Box my={1}>
              <Typography variant="h6" gutterBottom>
                Release date:
              </Typography>
              <Typography variant="body1">{movie.release_date}</Typography>
            </Box>
            <Box my={1}>
              <Typography variant="h6" gutterBottom>
                Overview:
              </Typography>
              <Typography variant="body1">{movie.overview}</Typography>
            </Box>
            <Box my={1}>
              <Typography variant="h6" gutterBottom>
                Genres:
              </Typography>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                {movie.genres.map((genre) => {
                  return (
                    <Box mr={1} key={genre.id}>
                      <Chip
                        label={genre.name}
                        style={{ backgroundColor: "#01b4e4", color: "white" }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box my={1}>
              <Typography variant="h6" gutterBottom>
                Average Rating:
              </Typography>
              <Box display="flex" alignItems="center">
                <StarIcon style={{ color: "#f5c518" }} />
                <Box ml={1}>
                  <Typography variant="body1">{movie.vote_average}</Typography>
                </Box>
              </Box>
            </Box>
            <Box my={1}>
              <Typography variant="h6">Your Rating:</Typography>
              <Box>
                <Typography variant="body1">
                  {ratedListMap[movieId] ? ratedListMap[movieId] : "Not yet"}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Select
                    value={rateValue}
                    onChange={(e) => setRateValue(e.target.value)}
                  >
                    {_.range(1, 11).map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box ml={3}>
                    <Button variant="outlined" onClick={handleRate}>
                      Rate it!
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box my={1}>
              <Typography variant="h6" gutterBottom>
                Production Companies:
              </Typography>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                {movie.production_companies.map((company) => {
                  return (
                    <Box
                      mr={2}
                      key={company.id}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <img
                        alt={company.name}
                        src={getImgUrl(company.logo_path)}
                        width="50px"
                        height="30"
                        style={{ objectFit: "cover" }}
                      />
                      <Typography variant="body2">{company.name}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;

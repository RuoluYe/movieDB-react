import React from "react";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import { useNavigate  } from 'react-router-dom';

const Card = styled(MuiCard)({
  '& .media': {
    height: '500px'
  },
  '& .content': {
    textAlign: 'center'
  },
  '& .actions': {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
const MovieCard = ({
  id,
  imgSrc,
  title,
  rating,
  myRating,
  favorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();
  return (
    <Card raised>
      <CardMedia className="media" image={imgSrc} title={title} />
      <CardActionArea onClick={() => navigate(`/movies/${id}`)}>
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="actions">
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ color: "#f5c518" }} />
          <Typography>
            {myRating ? `${rating} / ${myRating}` : rating}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          onClick={() => onToggleFavorite(id)}
        >
          {favorite ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "grey" }} />
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

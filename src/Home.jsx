import React, { useState, useEffect } from "react";
import { loadMovieList } from "./api";
import CategorySelect from "./components/CategorySelect";
import MovieCardList from "./components/MovieCardList";
import Pagination from "./components/Pagination";
import { CATEGORIES, TABS } from "./constants";

export default function Home(props) {
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [category, setCategory] = useState(CATEGORIES.NOW_PLAYING.value);

  useEffect(() => {
    console.log("loading Movie");
    loadMovieList(category, currentPage).then((data) => {
      setTotalPages(data.total_pages);
      setMovies(data.results);
    });
  }, [category, currentPage]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const onPrev = () => {
    console.log("onPrev");
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    console.log("onNext", currentPage, totalPages);
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const onToggleLike = (movie) => {
    if (likes.find((like) => like.id === movie.id)) {
      const newLikes = likes.filter((like) => like.id !== movie.id);
      setLikes(newLikes);
    } else {
      setLikes([...likes, movie]);
    }
  };

  const isHome = props.activeTab === TABS.HOME;
  const movieList = isHome ? movies : likes;
  return (
    <>
      {isHome && (
        <>
          <CategorySelect
            category={category}
            onCategoryChange={handleCategoryChange}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={onPrev}
            onNext={onNext}
          />
        </>
      )}
      <MovieCardList movies={movieList} likes={likes} onLike={onToggleLike} />
    </>
  );
}

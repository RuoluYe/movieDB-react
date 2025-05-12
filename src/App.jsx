import "@fontsource/roboto";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./containers/Login";
import MovieDetails from "./containers/MovieDetails";
import HomeMovieList from "./containers/HomeMovieList";
import UserLoader from "./containers/UserLoader";
import { FavListContext } from "./Context/FavListContext";
import { MovieListContext } from "./Context/MovieListsContext";
import { RatedListContext } from "./Context/RatedListContext";
import { UserContext } from "./Context/UserContext";
import FavoriteList from "./containers/FavoriteList";
import RatedList from "./containers/RatedList";

function App() {
  const [movieListMap, setMovieListMap] = useState({});
  const [favListMap, setFavListMap] = useState({});
  const [ratedListMap, setRatedListMap] = useState({});
  const [user, setUser] = useState(null);
  return (
    <>
      <MovieListContext.Provider value={{ movieListMap, setMovieListMap }}>
        <FavListContext.Provider value={{ favListMap, setFavListMap }}>
          <RatedListContext.Provider value={{ ratedListMap, setRatedListMap }}>
            <UserContext.Provider value={{ user, setUser }}>
              <UserLoader>
                <Header />
                <Routes>
                  <Route path="/movies/:movieId" element={<MovieDetails />} />
                  <Route path="/" element={<HomeMovieList />} />
                  <Route path="/favorite" element={<FavoriteList />} />
                  <Route path="/rated" element={<RatedList />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </UserLoader>
            </UserContext.Provider>
          </RatedListContext.Provider>
        </FavListContext.Provider>
      </MovieListContext.Provider>
    </>
  );
}

export default App;

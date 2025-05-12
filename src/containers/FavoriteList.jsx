import React, { useContext } from 'react'
import { FavListContext } from '../Context/FavListContext';
import AccountList from './AccountMovieList.jsx'



const FavoriteList = () => {
  const { favListMap } = useContext(FavListContext);
  return (
    <AccountList type="favorite" title="Favorite movies" listMap={favListMap} />
  )
}

export default FavoriteList;

import React, { useContext } from 'react'
import { RatedListContext } from '../Context/RatedListContext';
import AccountList from './AccountMovieList'



const RatedList = () => {
  const { ratedListMap } = useContext(RatedListContext);
  return (
    <AccountList type="rated" title="Rated movies" listMap={ratedListMap} />
  )
}

export default RatedList;

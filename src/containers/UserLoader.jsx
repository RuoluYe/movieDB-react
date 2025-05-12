import { useContext, useEffect } from 'react'
import client from '../client';
import useUser from '../hooks/useUser';
import _ from 'lodash'
import { RatedListContext } from '../Context/RatedListContext';
import { FavListContext } from '../Context/FavListContext';


const UserLoader = (props) => {
  const { setUser, setLoading, user } = useUser();
  const { setFavListMap } = useContext(FavListContext);
  const { setRatedListMap } = useContext(RatedListContext);
  useEffect(() => {
    const userInStorage = localStorage.getItem('user');
    if (userInStorage) {
      const userInfo = JSON.parse(userInStorage);
      if (!user) {
        setUser(userInfo);
      }
      client.defaults.params = { ...client.defaults.params, session_id: userInfo.sessionId }
      setLoading(true);
      Promise.all([
        client.get(`/account/${userInfo.accountId}/favorite/movies`).then(({ data }) => {
          const { results } = data;
          const mapResult = _.keyBy(results, 'id');
          setFavListMap(mapResult)
        }),
        client.get(`/account/${userInfo.accountId}/rated/movies`).then(({ data }) => {
          const { results } = data;
          const mapResult = results.reduce((acc, item) => {
            return { ...acc, [item.id]: item.rating }
          }, {});
          setRatedListMap(mapResult)
        })
      ]).then(() => {
        setLoading(false);
      })
        ;
      ;
    }
  }, [user, setFavListMap, setLoading, setRatedListMap, setUser]);
  return props.children;
}

export default UserLoader

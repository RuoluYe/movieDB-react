import { useContext, useState } from "react"
import client from "../client";
import { FavListContext } from "../Context/FavListContext";
import { RatedListContext } from "../Context/RatedListContext";
import { UserContext } from "../Context/UserContext"

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const { setFavListMap } = useContext(FavListContext);
  const { setRatedListMap } = useContext(RatedListContext);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const { data: { request_token } } = await client.get(`/authentication/token/new`);
      await client.post('/authentication/token/validate_with_login', { username, password, request_token });
      const { data: { session_id } } = await client.post(`/authentication/session/new`, { request_token });
      client.defaults.params = { ...client.defaults.params, session_id }
      const { data } = await client.get('/account');
      const userData = {
        username,
        accountId: data.id,
        sessionId: session_id,
        requestToken: request_token
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData)
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }

  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setFavListMap({});
    setRatedListMap({});
  }

  return {
    user,
    login,
    logout,
    loading,
    setUser,
    setLoading
  }
}

export default useUser;
import { AuthState } from "../contexts/AuthContext";
import axios from "../utils/axios";

const useRefreshToken = () => {
  const { auth, setAuth } = AuthState();

  const refresh = async () => {
    let d;
    try {
      const { data } = await axios.get("http://localhost:3000/auth/refresh");
      setAuth(data);
      d = data.accessToken;
    } catch (error) {
      console.log(error);
    }
    return d;
  };
  return refresh;
};

export default useRefreshToken;

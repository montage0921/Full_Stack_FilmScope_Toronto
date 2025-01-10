import axios from "axios";
import { LoginStatus } from "../utils/loginstatus";

const baseUrl = "http://localhost:8080/auth-filmscope";

export const sendLoginInfo = async (loginInfo, setLoginStatus) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, loginInfo);
    if (response.status === 200) {
      const token = await response.data.accessToken;
      localStorage.setItem("accessToken", token);
      await setLoginStatus(LoginStatus.SUCCESS);
      return LoginStatus.SUCCESS;
    }
  } catch (error) {
    setLoginStatus(LoginStatus.FAILED);
  }
};

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { sendLoginInfo } from "../../api/userAuth";
import { LoginStatus } from "../../utils/loginstatus";
import { Slide, toast } from "react-toastify";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginStatus, setLoginStatus, setClickLoginDropDown } =
    useContext(AuthContext);

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginInfo = {
      username: username,
      password: password,
    };
    const result = await sendLoginInfo(loginInfo, setLoginStatus, loginStatus);
    if (result === LoginStatus.SUCCESS) {
      setClickLoginDropDown(false);
      toast.success("🎉Loged in as admin!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <span className="mt-3 text-white font-semibold self-center">
        Admin Login
      </span>
      <form
        className="flex flex-col text-white text-sm pl-1"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          className="w-11/12 text-black mb-1"
          onChange={handleUserName}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className="w-11/12 text-black"
          value={password}
          onChange={handlePassword}
        />
        <button
          className="mt-2 w-16 border-white self-center border-2 rounded-md hover:font-bold"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

import React from "react";
import LoginIcon from "../components/icons/LoginIcon";
import LoginForm from "../components/LoginForm";

function LoginContainer({ clickLoginDropDown, setClickLoginDropDown }) {
  return (
    <div>
      <button
        onClick={() => {
          setClickLoginDropDown(!clickLoginDropDown);
        }}
        className="relative"
      >
        <LoginIcon></LoginIcon>
      </button>
      {clickLoginDropDown && (
        <div
          className="absolute flex flex-col  bg-blue-300 text-lg text-gray-500 rounded-lg  shadow w-56 top-10 right-0
                        gap-3 items-center"
        >
          <span className="mt-3">Please Login as Admin</span>
          <form className="text-white">
            <label for="username">Username</label>
            <input type="text" id="username" className="w-full" />
            <label for="password">Password</label>
            <input type="text" id="password" className="w-full" />
            <button>Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginContainer;

import { useContext } from "react";
import LoginIcon from "../components/icons/LoginIcon";
import LoginForm from "../components/LoginForm";
import { LoginContext } from "../App";
import LogoutForm from "../components/LogoutForm";
import { LoginStatus } from "../utils/loginstatus";

function LoginContainer({ clickLoginDropDown, setClickLoginDropDown }) {
  const { loginStatus } = useContext(LoginContext);
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
          className="absolute flex flex-col  bg-blue-300 text-lg text-gray-500 rounded-lg  shadow w-56 top-12 right-0
                        gap-3 items-center pb-3"
        >
          {loginStatus === LoginStatus.SUCCESS ? (
            <>
              <LogoutForm></LogoutForm>
            </>
          ) : (
            <>
              <LoginForm></LoginForm>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginContainer;

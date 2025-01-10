import { useContext, useEffect } from "react";
import LoginIcon from "../../components/icons/LoginIcon";
import LoginForm from "../../components/admin_frontpage/LoginForm";
import LogoutForm from "../../components/admin_frontpage/LogoutForm";
import { LoginStatus } from "../../utils/loginstatus";
import { AuthContext } from "../../context/AuthContext";

function LoginContainer() {
  const { loginStatus, clickLoginDropDown, setClickLoginDropDown } =
    useContext(AuthContext);

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
      {console.log(clickLoginDropDown)}
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

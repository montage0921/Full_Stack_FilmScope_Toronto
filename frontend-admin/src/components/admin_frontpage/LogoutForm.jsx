import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoginStatus } from "../../utils/loginstatus";

function LogoutForm() {
  const { setLoginStatus, setClickLoginDropDown } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoginStatus(LoginStatus.NOT_ATTEMPTED);
    setClickLoginDropDown(false);
  };

  return (
    <div className="flex-col flex">
      <span className="mt-3 text-white font-bold">Welcome Admin</span>
      <button
        className="my-2 w-20 border-white border-2 rounded-md hover:font-bold self-center
                        text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutForm;

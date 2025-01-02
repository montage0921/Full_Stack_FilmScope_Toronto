import "./index.css";
import NavBar from "./containers/NavBar";
import Footer from "./components/Footer";
import DashBoard from "./containers/DashBoard";
import ShowContainer from "./containers/ShowContainer";
import { createContext, useState } from "react";
import { LoginStatus } from "./utils/loginstatus";

export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.NOT_ATTEMPTED);

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <div className="grid grid-rows-[64px_auto_64px] grid-cols-[20%_80%] h-screen">
        <NavBar></NavBar>
        <DashBoard></DashBoard>
        <ShowContainer></ShowContainer>
        <Footer></Footer>
      </div>
    </LoginContext.Provider>
  );
}

export default App;

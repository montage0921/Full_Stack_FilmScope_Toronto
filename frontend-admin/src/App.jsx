import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashBoard from "./containers/DashBoard";
import ListContainer from "./containers/ListContainer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <div className="bg-red-300 h-screen grid grid-cols-2">
        <DashBoard></DashBoard>
        <ListContainer></ListContainer>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

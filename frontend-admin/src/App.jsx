import "./index.css";
import Header from "./containers/NavBar";
import Footer from "./components/Footer";
import DashBoard from "./containers/DashBoard";
import ShowContainer from "./containers/ShowContainer";

function App() {
  return (
    <div className="grid grid-rows-[64px_auto_64px] grid-cols-[30%_70%] h-screen">
      <Header></Header>
      <DashBoard></DashBoard>
      <ShowContainer></ShowContainer>
      <Footer></Footer>
    </div>
  );
}

export default App;

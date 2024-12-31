import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashBoard from "./containers/DashBoard";
import ShowContainer from "./containers/ShowContainer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <div
        className="flex-grow grid grid-rows-[auto_auto] md:grid-cols-[30%_70%] md:grid-rows-1 
        lg:grid-cols-[300px_auto] xl:grid-cols-[400px_auto] gap-4"
      >
        <DashBoard></DashBoard>
        <ShowContainer></ShowContainer>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

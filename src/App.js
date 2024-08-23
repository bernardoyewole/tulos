import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import NewArrival from "./components/NewArrival";
import NewStore from "./components/NewStore";

function App() {
  return (
    <div className="h-full">
      <Header />
      <HeroBanner />
      <NewArrival />
      <NewStore />
    </div>
  );
}

export default App;

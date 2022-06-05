import { Route, Routes } from "react-router-dom";
import Favourites from "./components/Favourites";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favorites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;

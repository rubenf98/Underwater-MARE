import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./views/Footer/Footer";
import Homepage from "./views/Homepage/Homepage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <div className="mainContent">
          <Routes></Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

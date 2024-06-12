import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Layout from "./Components/Layout";
import Landing from "./Components/Landing";
import Information from "./Components/Information";
import Registerd from "./Components/Registerd";
import Scoreboard from "./Components/Scoreboard";
import Rules from "./Components/Rules";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Landing />} index />
          <Route path="/info" element={<Information />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/participants" element={<Registerd />} />
        </Route>
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

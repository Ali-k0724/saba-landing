import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Layout from "./Components/Layout";
import Landing from "./Components/Landing";
import Information from "./Components/Information";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import PrivateRoute from "./Components/PrivateRoute";
import Registerd from "./Components/Registerd";
import Profile from "./Components/Profile";
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
          {/* <Route element={<PrivateRoute role={"User"} />}>
            <Route path="/profile" element={<Profile />} />
          </Route> */}
        </Route>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

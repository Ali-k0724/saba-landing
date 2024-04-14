import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import History from "./History";
import Contact from "./Contact";
import Header from "./Header";
import About from "./About";

const Landing = () => {
  const { state, pathname } = useLocation();
  const { targetId } = state || {};
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: targetId == "about" ? "center" : "start",
      });
      navigate(".", { replace: true });
    }
  }, [targetId]);

  return (
    <>
      <Header width={width} />
      <About />
      <History width={width} />
      <Contact />
    </>
  );
};

export default Landing;

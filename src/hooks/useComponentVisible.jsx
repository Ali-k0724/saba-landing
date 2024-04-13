import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
  const ref = useRef(null);
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisable(true);
      }
    });
    observer.observe(ref.current);
  }, []);

  return { ref, isVisable, setIsVisable };
}

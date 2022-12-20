import { useEffect, useState } from "react";

export function makeImagePath(id: string, format?: string) {
  if (id === "") return "";
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

function getWindowDimensions() {
  const width = window.innerWidth;
  return width;
}
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
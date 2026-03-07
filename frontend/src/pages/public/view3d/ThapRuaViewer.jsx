import React, { useEffect } from "react";
import ThapRua3DView from "./ThapRua3DView";

const ThapRuaViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ThapRua3DView />;
};

export default ThapRuaViewer;

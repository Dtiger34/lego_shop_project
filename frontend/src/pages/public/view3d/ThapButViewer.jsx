import React, { useEffect } from "react";
import ThapBut3DView from "./ThapBut3DView";

const ThapButViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ThapBut3DView />;
};

export default ThapButViewer;

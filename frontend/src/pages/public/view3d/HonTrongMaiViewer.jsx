import React, { useEffect } from "react";
import HonTrongMai3DView from "./HonTrongMai3DView";

const HonTrongMaiViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <HonTrongMai3DView />;
};

export default HonTrongMaiViewer;

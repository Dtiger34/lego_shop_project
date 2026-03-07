import React, { useEffect } from "react";
import CauTheHuc3DView from "./CauTheHuc3DView";

const CauTheHucViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CauTheHuc3DView />;
};

export default CauTheHucViewer;

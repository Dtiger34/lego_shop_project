import React, { useEffect } from "react";
import NgoMonHue3DView from "./NgoMonHue3DView";

const NgoMonHueViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <NgoMonHue3DView />;
};

export default NgoMonHueViewer;

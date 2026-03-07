import React, { useEffect } from "react";
import DenNgocSon3DView from "./DenNgocSon3DView";

const DenNgocSonViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <DenNgocSon3DView />;
};

export default DenNgocSonViewer;

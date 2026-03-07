import React, { useEffect } from "react";
import KhueVanCac3DView from "./KhueVanCac3DView";

const KhueVanCacViewer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <KhueVanCac3DView />;
};

export default KhueVanCacViewer;

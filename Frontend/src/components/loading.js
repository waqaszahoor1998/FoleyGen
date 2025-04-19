import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(prevProgress + diff, 100);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-bar" 
    style={{
            height:400,
            display:"flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            marginTop:"100px"


                }}>
      <h2>Video is processing, please wait</h2>
      <div>
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingBar;

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Preloader() {
  const [animate, setAnimate] = useState("offscreen");

  useEffect(() => {
    // Slide in after mount
    const enterTimeout = setTimeout(() => setAnimate("enter"), 50);
    // Slide out after 5s
    const exitTimeout = setTimeout(() => setAnimate("exit"), 5050);
    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  return (
    <div
      className={`preloader-anim preloader-anim--${animate}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#fff",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all"
      }}
    >
      <style>{`
        .preloader-anim {
          transition: transform 1s cubic-bezier(0.77,0,0.18,1);
        }
        .preloader-anim--offscreen {
          transform: translateX(100vw);
        }
        .preloader-anim--enter {
          transform: translateX(0);
        }
        .preloader-anim--exit {
          transform: translateX(-100vw);
        }
      `}</style>
      <Lottie
        animationData={require("@/public/preloader/Bike.json")}
        style={{ width: 200, height: 200 }}
        loop
      />
    </div>
  );
}

import React from "react";
import "./style.scss";

export const Robot = () => {
  return (
    <div className="cute-robot-v1 bounce">
      <div className="circle-bg">
        <div className="robot-ear left"></div>
        <div className="robot-head">
          <div className="robot-face">
            <div className="eyes left"></div>
            <div className="eyes right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="robot-ear right"></div>
        <div className="robot-body"></div>
      </div>
    </div>
  );
};

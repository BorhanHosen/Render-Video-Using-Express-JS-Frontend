import React from "react";
import { Composition } from "remotion";
import "./index.css";
// import MyComposition from "./MyComposition";
// import MCQ from "../../components/MCQ";
import MCQVideo from "../../components/MCQVideo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MCQVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

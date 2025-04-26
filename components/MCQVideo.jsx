// src/MCQVideo.jsx
import { useCurrentFrame, interpolate, spring } from "remotion";
import React from "react";

const fadeInSlideUp = (frame, delay, fps) => {
  const localFrame = Math.max(0, frame - delay);
  const opacity = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(localFrame, [0, 5], [40, 0], {
    extrapolateRight: "clamp",
  });

  return { opacity, transform: `translateY(${translateY}px)` };
};

const correctAnswer = (frame, delay, fps, backgroundColor) => {
  // Directly interpolate RGB values using frame
  const red = interpolate(frame, [150, 160], [255, 0], {
    extrapolateRight: "clamp",
  });
  const green = interpolate(frame, [150, 160], [245, 240], {
    extrapolateRight: "clamp",
  }); // Stays 0 in your original example
  const blue = interpolate(frame, [150, 160], [247, 0], {
    extrapolateRight: "clamp",
  });
  255, 245, 247;
  72, 187, 120;
  return {
    backgroundColor: `rgb(
        ${Math.round(red)}, 
        ${Math.round(green)}, 
        ${Math.round(blue)}
      )`,
  };
};

// Animate from red to blue over 60 frames

const MCQVideo = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const secondsLeft = Math.max(0, 5 - Math.floor(frame / fps));
  const showAnswer = secondsLeft === 0;

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-800 p-10 flex items-center justify-center">
      <div className="flex flex-col gap-6 p-6 bg-white shadow-2xl rounded-2xl w-full max-w-4xl">
        {/* Countdown */}
        <div className="flex justify-end">
          {
            <span className="text-lg font-bold text-red-600 bg-red-100 px-3 py-1 rounded shadow-md">
              Time left: {secondsLeft}s
            </span>
          }
        </div>

        {/* Question */}
        <div style={fadeInSlideUp(frame, 0, fps)}>
          <h1 className="p-4 text-lg font-semibold shadow-md shadow-purple-400 rounded-lg bg-purple-200">
            Question 01: What is CSS?
          </h1>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <h1
              style={fadeInSlideUp(frame, 5, fps)}
              className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100"
            >
              Option 01: CSS is a style sheet language
            </h1>
            <h1
              style={fadeInSlideUp(frame, 7, fps)}
              className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100"
            >
              Option 02: CSS is designed to separate the presentation and
              content, including layout, colors, and fonts
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <h1
              style={fadeInSlideUp(frame, 9, fps)}
              className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100"
            >
              Option 03: CSS is the language used to style the HTML documents
            </h1>
            <h1
              style={
                showAnswer
                  ? correctAnswer(frame, 12, fps)
                  : fadeInSlideUp(frame, 12, fps)
              }
              className={`w-full p-4 shadow-md rounded-lg bg-pink-100 shadow-pink-400`}
            >
              Option 04: All of the mentioned
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQVideo;

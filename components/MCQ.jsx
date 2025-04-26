import React, { useEffect, useState } from "react";

const MCQ = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowAnswer(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-800 p-10 flex items-center justify-center">
      <div className="flex flex-col gap-6 p-6 bg-white shadow-2xl rounded-2xl w-full max-w-4xl animate-slide-up">
        {/* Countdown */}
        <div className="flex justify-end">
          {!showAnswer && (
            <span className="text-lg font-bold text-red-600 bg-red-100 px-3 py-1 rounded shadow-md animate-bounce">
              Time left: {timeLeft}s
            </span>
          )}
        </div>

        {/* Question */}
        <div>
          <h1 className="p-4 text-lg font-semibold shadow-md shadow-purple-400 rounded-lg bg-purple-200 hover:scale-105 transition-transform duration-300">
            Question 01: What is CSS?
          </h1>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <h1 className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-300 animate-slide-up delay-100">
              Option 01: CSS is a style sheet language
            </h1>
            <h1 className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-300 animate-slide-up delay-200">
              Option 02: CSS is designed to separate the presentation and
              content, including layout, colors, and fonts
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <h1 className="w-full p-4 shadow-md shadow-pink-400 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-300 animate-slide-up delay-300">
              Option 03: CSS is the language used to style the HTML documents
            </h1>
            <h1
              className={`w-full p-4 shadow-md rounded-lg transition-all duration-300 animate-slide-up delay-400 ${
                showAnswer
                  ? "bg-green-300 shadow-green-500 text-black"
                  : "bg-pink-100 shadow-pink-400 hover:bg-pink-200"
              }`}
            >
              Option 04: All of the mentioned
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQ;

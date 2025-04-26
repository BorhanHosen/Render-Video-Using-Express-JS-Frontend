import React, { useState } from "react";

const RemotionRender = () => {
  const [compositionId, setCompositionId] = useState("HelloWorld");
  const [inputProps, setInputProps] = useState(
    '{"titleText": "Dynamic Title!", "titleColor": "blue"}'
  );
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("black");
  const [isRendering, setIsRendering] = useState(false);

  const handleRender = async () => {
    setIsRendering(true);
    setStatus("🚀 Starting render process... Please wait.");
    setStatusColor("orange");

    let parsedProps = null;

    try {
      parsedProps = JSON.parse(inputProps || "{}");
    } catch (e) {
      setStatus(`❌ Error: Invalid JSON in Input Props. ${e.message}`);
      setStatusColor("red");
      setIsRendering(false);
      return;
    }

    try {
      const response = await fetch("/api/render-and-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          compositionId,
          inputProps: parsedProps,
        }),
      });

      if (!response.ok) {
        let errorMsg = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = `❌ Error: ${errorData.message || response.statusText}`;
        } catch (_) {}
        throw new Error(errorMsg);
      }

      const contentDisposition = response.headers.get("content-disposition");
      let filename = "downloaded-video.mp4";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/i);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      // Read blob and force download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setStatus(
        `✅ Render complete! Download should start automatically. Filename: ${filename}`
      );
      setStatusColor("green");
    } catch (error) {
      console.error("Render request failed:", error);
      setStatus(`❌ Render failed: ${error.message}`);
      setStatusColor("red");
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Render Your Video</h1>
      {/* 
      <label htmlFor="compositionSelect">Choose Composition:</label>
      <select
        id="compositionSelect"
        value={compositionId}
        onChange={(e) => setCompositionId(e.target.value)}
      >
        <option value="HelloWorld">Hello World</option>
        <option value="AnotherComp">Another Composition</option>
      </select>

      <br />
      <br />

      <label htmlFor="propsInput">Input Props (JSON):</label>
      <br />
      <textarea
        id="propsInput"
        rows="4"
        cols="50"
        value={inputProps}
        onChange={(e) => setInputProps(e.target.value)}
      ></textarea> */}

      <br />
      <br />

      <button
        className="bg-cyan-500 p-1 rounded-md hover:bg-cyan-600 text-white font-bold"
        onClick={handleRender}
        disabled={isRendering}
        style={{
          cursor: isRendering ? "not-allowed" : "pointer",
          opacity: isRendering ? 0.6 : 1,
        }}
      >
        Render & Download Video
      </button>

      <div id="status" style={{ marginTop: "15px", color: statusColor }}>
        {status}
      </div>
    </div>
  );
};

export default RemotionRender;

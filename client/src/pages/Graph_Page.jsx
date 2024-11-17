import React from "react";
import "./Graph_Page.css";
import MindMap from "./MindMap";
import Navbar from "../Components/Navbar";

const GraphPage = () => {
  return (
    <>
    <Navbar />
      <div className="graph-page-container">
        <header className="graph-page-header">
          <h1 className="graph-page-title">Graph and Mind Map Viewer</h1>
          <p className="graph-page-subtitle">
            Visualize your ideas with clarity and style
          </p>
        </header>

        <main className="graph-page-mindmap-container">
          <MindMap />
        </main>

        <footer className="graph-page-footer">
          <p>
            Powered by{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              Future Fit
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default GraphPage;

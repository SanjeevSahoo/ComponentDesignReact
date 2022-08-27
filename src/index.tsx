import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.scss";

const container = document.getElementById("root");
const root = createRoot(container as Element); // createRoot(container!) if you use TypeScript
root.render(<App />);
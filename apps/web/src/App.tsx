
import "./index.css";

import Flow from "./components/FlowDiagram";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflow" element={<Flow/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;


import "./index.css";

import Flow from "./components/FlowDiagram";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
export function App() {
  return (
    <BrowserRouter>
    <Toaster  position="bottom-right"/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflow" element={<Flow/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

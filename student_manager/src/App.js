import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Detail from "./component/Detail";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:code" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


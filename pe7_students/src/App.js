import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home"
import Student from "./component/Student";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Home />} />
        <Route path="/student/:studentid" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

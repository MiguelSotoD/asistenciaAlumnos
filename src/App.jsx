import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import StudentsHome from "./pages/StudentsHome";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students-home" element={<StudentsHome />} />
      </Routes>
    </Router>
  )
}

export default App;
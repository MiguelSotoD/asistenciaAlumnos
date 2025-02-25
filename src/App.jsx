import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import StudentsHome from "./pages/StudentsHome";
import ListaAlumnos from './pages/ListaAlumnos';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio-alumnos" element={<StudentsHome />} />
        <Route path="/Lista-alumnos" element={<ListaAlumnos />} />
      </Routes>
    </Router>
  )
}

export default App;
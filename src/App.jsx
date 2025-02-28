import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import StudentsHome from "./pages/StudentsHome";
import ListaAlumnos from './pages/ListaAlumnos';
import RecuperarContraseña from './pages/RecuperarContraseña';
import ErrorPage from './components/ErrorPage';
import AddNewGroup from './pages/AddNewGroup';
import RegisterStudents from './pages/RegisterStudents';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio-alumnos" element={<StudentsHome />} />
        <Route path="/Lista-alumnos/:id_grupo" element={<ListaAlumnos />} />
        <Route path='/Recuperar-contraseña' element={<RecuperarContraseña />} />
        <Route path="/Agregar-Nuevo-Grupo" element={<AddNewGroup />} />
        <Route path="/register-students" element={<RegisterStudents />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App;
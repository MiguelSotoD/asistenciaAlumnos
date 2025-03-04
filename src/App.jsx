import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import StudentsHome from "./pages/StudentsHome";
import ListaAlumnos from './pages/ListaAlumnos';
import RecuperarContraseña from './pages/RecuperarContraseña';
import ErrorPage from './components/ErrorPage';
import AddNewGroup from './pages/AddNewGroup';
import RegisterStudents from './pages/RegisterStudents';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio-alumnos" element={
          <ProtectedRoute>
            <StudentsHome />
          </ProtectedRoute>
        } />
        <Route path="/Lista-alumnos/:id_grupo" element={
          <ProtectedRoute>
            <ListaAlumnos />
          </ProtectedRoute>
        } />
        <Route path='/Recuperar-contraseña' element={<RecuperarContraseña />} />
        <Route path="/Agregar-Nuevo-Grupo" element={
          <ProtectedRoute>
            <AddNewGroup />
          </ProtectedRoute>
        } />
        <Route path="/register-students" element={
          <ProtectedRoute>
            <RegisterStudents />
          </ProtectedRoute>
        } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App;
import MegaMenu from '../components/MegaMenu';
import FormNewGroup from '../components/FormNewGroup';
import { useNavigate } from 'react-router-dom';

const AddNewGroup = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (grupo, carrera) => {
    // Manejar el envío del formulario
    console.log('Grupo:', grupo, 'Carrera:', carrera);
    navigate('/register-students');
  };

  return (
    <>
        <MegaMenu />
        <FormNewGroup onSubmit={handleFormSubmit} />
    </>
  )
}

export default AddNewGroup;

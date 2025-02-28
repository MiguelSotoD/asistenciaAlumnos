import MegaMenu from '../components/MegaMenu';
import FormNewGroup from '../components/FormNewGroup';
import { useNavigate } from 'react-router-dom';
import { postGroup } from '../api/Groups';

const AddNewGroup = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (grupo, carrera, idMateria) => {
    // Manejar el envío del formulario
    const data = {
      nombre: grupo,
      carrera: carrera,
      id_materia: idMateria
    };
    try {
      const response = await postGroup(data);
      console.log('Response:', response);
      navigate('/register-students');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <>
        <MegaMenu />
        <FormNewGroup onSubmit={handleFormSubmit} />
    </>
  )
}

export default AddNewGroup;

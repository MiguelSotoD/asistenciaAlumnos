import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMaterias } from '../api/Materias';

const CardGroup = ({ groups = [] }) => {
  const navigate = useNavigate();
  const [nombreMateria, setNombreMateria] = useState('');

  useEffect(() => {
    const fetchMateria = async (materiaId) => {
      try {
        const materias = await getMaterias();
        const materia = materias.find(m => m.id_materias === materiaId);
        if (materia) {
          setNombreMateria(materia.nombre_materia);
        }
      } catch (error) {
        console.error('Error fetching materia:', error);
      }
    };

    if (groups.length > 0) {
      fetchMateria(groups[0].materia_id);
    }
  }, [groups]);

  return (
    <div>
      {groups.map((group, index) => (
        <div key={group.id || index} className="bg-gray-300 hover:bg-zinc-400 text-black p-4 rounded-lg flex flex-col justify-between items-start w-full max-w-md h-26 relative ml-0 sm:ml-34 sm:max-w-full md:max-w-1/2">
          <div>
            <h2 className="text-lg font-semibold">{group.nombre_grupo}</h2>
            <p className="text-sm">{group.carrera}</p>
            <p className="text-sm">Materia: {nombreMateria}</p>
          </div>
          <button onClick={() => navigate(`/Lista-alumnos/${group.id_grupo}`)} className="text-white bg-button-primary hover:bg-button-secondary font-medium rounded-lg text-sm px-4 py-1 md:px-4 md:py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 absolute bottom-2 right-4 cursor-pointer">Ir</button>
        </div>
      ))}
    </div>
  );
};

export default CardGroup;


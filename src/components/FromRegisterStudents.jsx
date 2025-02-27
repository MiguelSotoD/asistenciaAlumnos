import { useState } from 'react';

const FromRegisterStudents = () => {
    const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);

  const handleNumStudentsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumStudents(num);
    setStudents(Array(num).fill(''));
  };

  const handleStudentNameChange = (index, e) => {
    const newStudents = [...students];
    newStudents[index] = e.target.value;
    setStudents(newStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Students:', students);
    // Manejar el envío de los nombres de los alumnos
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg shadow-gray w-4/5 max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Registrar Alumnos</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="numStudents" className="block text-sm font-semibold mb-2">Número de Alumnos</label>
            <input 
              type="number" 
              id="numStudents" 
              value={numStudents} 
              onChange={handleNumStudentsChange} 
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" 
            />
          </div>
          {students.map((student, index) => (
            <div key={index} className="mb-6">
              <label htmlFor={`student-${index}`} className="block text-sm font-semibold mb-2">Nombre del Alumno {index + 1}</label>
              <input 
                type="text" 
                id={`student-${index}`} 
                value={student} 
                onChange={(e) => handleStudentNameChange(index, e)} 
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green" 
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button type="submit" className="bg-button-primary text-white p-1.5 rounded-lg w-1/2 hover:bg-button-secondary transition duration-300 cursor-pointer">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FromRegisterStudents
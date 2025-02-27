import { useState, useEffect } from 'react';

const TableStudents = ({ mes, searchTerm }) => {
    const [diasDelMes, setDiasDelMes] = useState([]);
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        const diasEnMes = new Date(2023, mes + 1, 0).getDate();
        setDiasDelMes(Array.from({ length: diasEnMes }, (_, i) => i + 1));
    }, [mes]);

    const [alumnos, setAlumnos] = useState([
      { id: 1, nombre: "AGUILAR JIMENEZ EVELYN GUADALUPE", asistencia: Array(31).fill('') },
      { id: 2, nombre: "ALVARADO DIEGO MARIA FERNANDA", asistencia: Array(31).fill('') },
      { id: 3, nombre: "CORTES GONZALEZ MARIA JOSE", asistencia: Array(31).fill('') },
      { id: 4, nombre: "CRISOSTOMO CEDILLO YOSHUA", asistencia: Array(31).fill('') },
      { id: 5, nombre: "ESCOBAR MORENO HUGO", asistencia: Array(31).fill('') },
      { id: 6, nombre: "GARCIA LOZADA DANA MAYTE", asistencia: Array(31).fill('') },
      { id: 7, nombre: "GUERRERO SANCHEZ AZUCENA", asistencia: Array(31).fill('') },
      { id: 8, nombre: "HERNANDEZ ZUÑIGA DANYA", asistencia: Array(31).fill('') },
      { id: 9, nombre: "JUAREZ MALDONADO ARIADNA SUGUHEY", asistencia: Array(31).fill('') },
      { id: 10, nombre: "JUAREZ MORENO ELIAS EMMANUEL", asistencia: Array(31).fill('') },
    ]);

    const toggleAsistencia = (id, dia, value) => {
      setAlumnos(alumnos.map(alumno => 
        alumno.id === id ? {
          ...alumno,
          asistencia: alumno.asistencia.map((asistio, index) =>
            index === dia ? value : asistio
          )
        } : alumno
      ));
    };

    const handleKeyDown = (e, id, dia) => {
      let nextId = id;
      let nextDia = dia;

      if (e.key === 'Tab') {
        e.preventDefault();
        nextId = (id % alumnos.length) + 1;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextId = (id % alumnos.length) + 1;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextId = (id - 2 + alumnos.length) % alumnos.length + 1;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextDia = (dia + 1) % diasDelMes.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextDia = (dia - 1 + diasDelMes.length) % diasDelMes.length;
      }

      const nextAlumno = alumnos.find(alumno => alumno.id === nextId);
      if (nextAlumno) {
        const nextInput = document.getElementById(`input-${nextAlumno.id}-${nextDia}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    };

    const filteredAlumnos = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="px-4 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-4">{meses[mes]}</h1>
      <h2 className="text-2xl font-bold mb-4">Lista de Asistencia</h2>
      <table className="border-collapse border border-gray-400 w-full text-sm">
        <thead>
        <tr className="bg-gray-300">
          <th className="border border-gray-400 p-2">No.</th>
          <th className="border border-gray-400 p-2 text-left">NOMBRE DEL ALUMNO</th>
          {diasDelMes.map((dia) => (
          <th key={dia} className="border border-gray-400 p-2 text-center">{dia}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredAlumnos.map((alumno, index) => (
          <tr key={alumno.id} className="hover:bg-gray-100">
          <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
          <td className="border border-gray-400 p-2">{alumno.nombre}</td>
          {diasDelMes.map((dia, i) => (
            <td key={i} className="border border-gray-400 p-2 text-center">
            <input
              type="text"
              id={`input-${alumno.id}-${i}`}
              value={alumno.asistencia[i]}
              onChange={(e) => toggleAsistencia(alumno.id, i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, alumno.id, i)}
              className="w-5 h-5 rounded-sm text-center border border-gray-400"
              maxLength="1"
            />
            </td>
          ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button className="bg-white border-1 border-button-primary text-black px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-button-secondary hover:text-white">
        Guardar
        </button>
      </div>
      </div>
    )
}

export default TableStudents;


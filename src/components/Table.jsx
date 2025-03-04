import { useState, useEffect } from 'react';
import { getGroupId } from '../api/GroupId';

const TableStudents = ({ mes, searchTerm, id_grupo }) => {
    const [diasDelMes, setDiasDelMes] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [asistencia, setAsistencia] = useState({});
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        const fetchAlumnos = async () => {
            const data = await getGroupId(id_grupo);
            setAlumnos(Array.isArray(data) ? data : []);
        };
        fetchAlumnos();
    }, [id_grupo]);

    useEffect(() => {
        const diasEnMes = new Date(2023, mes + 1, 0).getDate();
        setDiasDelMes(Array.from({ length: diasEnMes }, (_, i) => i + 1));
    }, [mes]);

    useEffect(() => {
        const initialAsistencia = alumnos.reduce((acc, alumno) => {
            acc[alumno.id_alumno] = Array(31).fill('');
            return acc;
        }, {});
        setAsistencia(initialAsistencia);
    }, [alumnos]);

    const toggleAsistencia = (id, dia, value) => {
        setAsistencia({
            ...asistencia,
            [id]: asistencia[id].map((asistio, index) => (index === dia ? value : asistio))
        });
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

        const nextAlumno = alumnos.find(alumno => alumno.id_alumno === nextId);
        if (nextAlumno) {
            const nextInput = document.getElementById(`input-${nextAlumno.id_alumno}-${nextDia}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const filteredAlumnos = alumnos.filter(alumno =>
        `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4 overflow-x-auto">
            <h1 className="text-3xl font-bold mb-4">{meses[mes]}</h1>
            <h2 className="text-2xl font-bold mb-4">Lista de Asistencia - Grupo {id_grupo}</h2>
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
                        <tr key={alumno.id_alumno} className="hover:bg-gray-100">
                            <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                            <td className="border border-gray-400 p-2">{`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}</td>
                            {diasDelMes.map((dia, i) => (
                                <td key={i} className="border border-gray-400 p-2 text-center">
                                    <input
                                        type="text"
                                        id={`input-${alumno.id_alumno}-${i}`}
                                        value={asistencia[alumno.id_alumno]?.[i] || ''}
                                        onChange={(e) => toggleAsistencia(alumno.id_alumno, i, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, alumno.id_alumno, i)}
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


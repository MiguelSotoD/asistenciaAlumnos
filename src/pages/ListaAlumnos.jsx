import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MegaMenu from "../components/MegaMenu";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";
import { getAlumns } from '../api/Alumns';

const ListaAlumnos = () => {
    const { id_grupo } = useParams();
    const [mes, setMes] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchAlumnos = async () => {
            const data = await getAlumns();
            const filteredAlumnos = data.filter(alumno => alumno.id_grupo === parseInt(id_grupo));
            setAlumnos(filteredAlumnos);
        };
        fetchAlumnos();
    }, [id_grupo]);

    const handleMesAnterior = () => {
        setMes((prevMes) => (prevMes === 0 ? 11 : prevMes - 1));
    };

    const handleMesSiguiente = () => {
        setMes((prevMes) => (prevMes === 11 ? 0 : prevMes + 1));
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return(
        <>
        <MegaMenu />
        <div className="relative">
            <div className="absolute right-0 mr-20">
                <SearchInput onSearch={handleSearch} />
            </div>
        </div>
        <Table mes={mes} searchTerm={searchTerm} alumnos={alumnos} />
        <Pagination onMesAnterior={handleMesAnterior} onMesSiguiente={handleMesSiguiente} />
        </>
    );
}

export default ListaAlumnos;
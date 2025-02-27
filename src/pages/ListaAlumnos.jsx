import { useState } from 'react';
import MegaMenu from "../components/MegaMenu";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";

const ListaAlumnos = () => {
    const [mes, setMes] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

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
        <Table mes={mes} searchTerm={searchTerm} />
        <Pagination onMesAnterior={handleMesAnterior} onMesSiguiente={handleMesSiguiente} />
        </>
    );
}

export default ListaAlumnos;
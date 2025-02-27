import { useState } from 'react';
import MegaMenu from "../components/MegaMenu";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";

const ListaAlumnos = () => {
    const [mes, setMes] = useState(0);

    const handleMesAnterior = () => {
        setMes((prevMes) => (prevMes === 0 ? 11 : prevMes - 1));
    };

    const handleMesSiguiente = () => {
        setMes((prevMes) => (prevMes === 11 ? 0 : prevMes + 1));
    };

    return(
        <>
        <MegaMenu />
        <div className="relative">
            <div className="absolute right-0 mr-20">
                <SearchInput />
            </div>
        </div>
        <Table mes={mes} />
        <Pagination onMesAnterior={handleMesAnterior} onMesSiguiente={handleMesSiguiente} />
        </>
    );
}

export default ListaAlumnos;
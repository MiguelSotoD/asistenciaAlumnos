import MegaMenu from "../components/MegaMenu";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";

const ListaAlumnos = () => {
    return(
        <>
        <MegaMenu />
        <div className="flex justify-end mr-20">
            <SearchInput /> 
        </div>
        <Table />
        <Pagination />
        </>
        
    );
}

export default ListaAlumnos;
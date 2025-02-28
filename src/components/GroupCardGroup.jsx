import { useState, useEffect } from 'react';
import CardGroup from "./CardGroup";
import SearchInput from "./SearchInput";
import { getGroup } from '../api/Groups';

export default function GroupCardGroup() {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getGroup();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredGroups = groups.filter(group =>
    (group.nombre_grupo && group.nombre_grupo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (group.carrera && group.carrera.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
    <div className="ml-0 mr-auto sm:ml-34 mb-10">
      <SearchInput onSearch={handleSearch} />
    </div>
      <h1 className="text-2xl sm:ml-34 ml-0 mb-6">Lista de grupos</h1>
      <div className="grid grid-cols-1 gap-4 mb-10">
        {filteredGroups.map(group => (
          <CardGroup key={group.materia_id} group={group} />
        ))}
      </div>
    </>
  );
}
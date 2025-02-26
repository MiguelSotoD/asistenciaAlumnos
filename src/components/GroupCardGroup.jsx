import { useState } from 'react';
import CardGroup from "./CardGroup";
import SearchInput from "./SearchInput";

export default function GroupCardGroup() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const groups = [
    { id: 1, name: '8A', description: 'Ingeniería en desarrollo y gestión de software' },
    { id: 2, name: '8B', description: 'Ingeniería en desarrollo y gestión de software' },
    // ...otros grupos...
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      <h1 className="text-2xl sm:ml-34 ml-0 mb-6">Lista de grupos</h1>
      <div className="grid grid-cols-1 gap-4 mb-10">
        {filteredGroups.map(group => (
          <CardGroup key={group.id} group={group} />
        ))}
      </div>
    </>
  );
}
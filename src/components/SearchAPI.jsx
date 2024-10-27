import React, { useState, useEffect } from 'react';
import { useDebounce } from '../useDebounce';

const SearchAPI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearchTerm = useDebounce(searchTerm, 2000);

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (debounceSearchTerm) {
      async function getMembers() {
        setLoading(true);
        try {
          const res = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${debounceSearchTerm}`
          );

          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();

          setMembers(data.results);

          console.log(data.results);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      getMembers();
    }
  }, [debounceSearchTerm]);

  console.log(members);

  return (
    <div className='flex flex-col items-center py-6'>
      <div className='max-w-[200px] w-full mb-[50px]'>
        <input
          type='text'
          placeholder='search'
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full rounded-[20px] pl-[12px] py-[5px]'
        />
      </div>
      {loading && <div>Loading...</div>}
      <div className='w-full flex justify-center'>
        <ul className='w-full flex flex-wrap justify-center'>
          {members.map((member) => (
            <li
              key={member.id}
              className='w-[200px] h-[200px] flex flex-col justify-around items-center bg-[#232323] m-[10px] rounded-[20px]'
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ width: '50px', height: 'auto' }}
              />
              <div className='flex flex-col justify-center items-center'>
                <h3>{member.name}</h3>
                <p>Status: {member.status}</p>
                <p>Species: {member.species}</p>
                <p>Earth: {member.origin.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchAPI;

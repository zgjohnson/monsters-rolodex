import './App.css';

import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [search, setSearchField] = useState(''); //[value, setValue]
  const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    setFilteredMonsters(
      monsters.filter((monster) =>
        monster.name.toLocaleLowerCase().includes(search)
      )
    );
  }, [monsters, search]);

  const onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    setSearchField(searchField);
  };

  const onTitleChange = (event) => {
    const searchField = event.target.value;
    setTitle(searchField);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>{title}</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder='Search Monsters'
        className='monster-search-box'
      />
      <br />
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder='Set Title'
        className='title-search-box'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;

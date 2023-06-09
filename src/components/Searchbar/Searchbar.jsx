import React, { useState } from 'react';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmitHandler }) => {
  const [name, setName] = useState('');

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={(event) => {
        event.preventDefault();
        onSubmitHandler({ name, page: 1 });
        setName('');
      }}>
        <button type="submit" className={s.SearchFormButton}>
          Search
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;



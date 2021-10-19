import { useState } from 'react';

import styles from './Searchbar.module.scss';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.SearchForm}>
      <button type="submit" className={styles.SearchFormButton}>
        <span className={styles.SearchFormButtonLabel}>Search</span>
      </button>
      <input
        onChange={onInputChange}
        value={searchQuery}
        className={styles.SearchFormInput}
        name="searchQuery"
        type="text"
        autoComplete="off"
      />
    </form>
  );
}

export default Searchbar;

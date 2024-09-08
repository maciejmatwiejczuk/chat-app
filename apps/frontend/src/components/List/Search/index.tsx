import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from './styles.module.css';

function Search() {
  return (
    <div className={styles.container}>
      <MagnifyingGlass size={24} weight="bold" className={styles.searchIcon} />
      <input type="text" className={styles.input} placeholder="Search" />
    </div>
  );
}

export default Search;

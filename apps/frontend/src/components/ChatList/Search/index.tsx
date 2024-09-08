import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from './styles.module.css';

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ value, setValue }: SearchProps) {
  return (
    <div className={styles.container}>
      <MagnifyingGlass size={24} weight="bold" className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Search;

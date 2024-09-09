import { MagnifyingGlass } from '@phosphor-icons/react';
import TextInput from '../../common/TextInput';
import styles from './styles.module.css';

interface SearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ value, setValue }: SearchProps) {
  return (
    <div className={styles.container}>
      <MagnifyingGlass size={24} weight="bold" className={styles.searchIcon} />
      <TextInput placeholder="Search" value={value} setValue={setValue} />
    </div>
  );
}

export default Search;

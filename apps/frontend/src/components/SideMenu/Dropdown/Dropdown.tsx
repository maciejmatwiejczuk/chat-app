import { useState } from 'react';
import { CaretUp } from '@phosphor-icons/react';
import styles from './dropdown.module.css';
import type { OptionValue } from '../SideMenu';

interface DropdownProps {
  options: { icon: JSX.Element; title: string; value: OptionValue }[];
  onSelect: React.Dispatch<React.SetStateAction<OptionValue>>;
}

function Dropdown({ options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<JSX.Element | string>(
    options[0].icon
  );

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? styles.trigger : styles.triggerOpened}
      >
        <CaretUp size={16} weight="bold" className={styles.caretIcon} />
        {selection}
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li className={styles.menuItem}>
              <button
                onClick={() => {
                  setSelection(option.icon);
                  onSelect(option.value);
                  setIsOpen(!isOpen);
                }}
              >
                {option.icon}
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

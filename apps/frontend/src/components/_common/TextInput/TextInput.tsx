import { ChangeEventHandler, useId } from 'react';
import PhosphorIcon from '../PhosphorIcon/PhosphorIcon';
import styles from './text-input.module.css';

type TextInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

interface TextInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: TextInputType;
  label?: string;
  placeholder?: string;
  iconName?: string;
}

function TextInput({
  value,
  onChange,
  type = 'text',
  label = '',
  placeholder = '',
  iconName = '',
}: TextInputProps) {
  const inputStyle = iconName
    ? `${styles.input} ${styles.inputWithIcon}`
    : styles.input;

  const id = useId();

  return (
    <>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {iconName && <PhosphorIcon name={iconName} size={24} weight="bold" />}
        <input
          id={id}
          type={type}
          className={inputStyle}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default TextInput;

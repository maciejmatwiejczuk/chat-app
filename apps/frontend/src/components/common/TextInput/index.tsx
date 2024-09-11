import PhosphorIcon from '../PhosphorIcon';
import styles from './styles.module.css';

type TextInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  type?: TextInputType;
  placeholder?: string;
  iconName?: string;
}

function TextInput({
  value,
  setValue,
  type = 'text',
  placeholder = '',
  iconName = '',
}: TextInputProps) {
  const inputStyle = iconName
    ? `${styles.input} ${styles.inputWithIcon}`
    : styles.input;

  return (
    <div className={styles.container}>
      {iconName && <PhosphorIcon name={iconName} size={24} weight="bold" />}
      <input
        type={type}
        className={inputStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;

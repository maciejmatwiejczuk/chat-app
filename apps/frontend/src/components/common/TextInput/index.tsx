import styles from './styles.module.css';

interface TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

function TextInput({ value, setValue, placeholder }: TextInputProps) {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default TextInput;

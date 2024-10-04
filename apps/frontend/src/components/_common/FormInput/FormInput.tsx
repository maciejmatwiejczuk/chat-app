import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useId,
} from 'react';
import TextInput, { TextInputType } from '../TextInput/TextInput';
import styles from './form-input.module.css';

interface FormInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  error?: string;
  type?: TextInputType;
  label?: string;
  placeholder?: string;
  iconName?: string;
  isRequired?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      name,
      type,
      label,
      placeholder,
      iconName,
      isRequired = false,
    }: FormInputProps,
    ref
  ) => {
    const id = useId();

    return (
      <div>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        )}
        <TextInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          iconName={iconName}
          isError={error}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

export default FormInput;

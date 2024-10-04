import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  LegacyRef,
  useId,
} from 'react';
import PhosphorIcon from '../PhosphorIcon/PhosphorIcon';
import styles from './text-input.module.css';
import classNames from 'classnames';

export type TextInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url';

interface TextInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  ref?: LegacyRef<HTMLInputElement>;
  type?: TextInputType;
  name?: string;
  placeholder?: string;
  iconName?: string;
  isError?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      type = 'text',
      name,
      placeholder,
      iconName,
      isError,
    }: TextInputProps,
    ref
  ) => {
    const inputStyle = classNames(styles.input, {
      [styles.inputWithIcon]: iconName,
      [styles.inputError]: isError,
    });

    const id = useId();

    return (
      <div className={styles.inputWrapper}>
        {iconName && <PhosphorIcon name={iconName} size={24} weight="bold" />}
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          id={id}
          type={type}
          className={inputStyle}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default TextInput;

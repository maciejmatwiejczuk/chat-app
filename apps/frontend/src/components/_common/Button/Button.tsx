import classNames from 'classnames';
import styles from './button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'fill' | 'outline';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  size?: ButtonSize;
  type?: ButtonType;
  isWide?: boolean;
  isDisabled?: boolean;
}

function Button({
  title,
  onClick,
  size = 'small',
  type = 'fill',
  isWide = false,
  isDisabled = false,
}: ButtonProps) {
  const buttonStyle = classNames(styles.button, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
    [styles.fill]: type === 'fill',
    [styles.outline]: type === 'outline',
    [styles.wide]: isWide,
  });

  return (
    <button onClick={onClick} className={buttonStyle} disabled={isDisabled}>
      {title}
    </button>
  );
}

export default Button;

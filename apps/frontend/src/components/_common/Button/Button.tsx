import classNames from 'classnames';
import styles from './button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'fill' | 'outline';
type ButtonStyle = 'default' | 'danger';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  size?: ButtonSize;
  type?: ButtonType;
  style?: ButtonStyle;
  isWide?: boolean;
  isDisabled?: boolean;
}

function Button({
  title,
  onClick,
  size = 'small',
  type = 'fill',
  style = 'default',
  isWide = false,
  isDisabled = false,
}: ButtonProps) {
  const buttonStyle = classNames(styles.button, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
    [styles.fillDefault]: style === 'default' && type === 'fill',
    [styles.outlineDefault]: style === 'default' && type === 'outline',
    [styles.fillDanger]: style === 'danger' && type === 'fill',
    [styles.outlineDanger]: style === 'danger' && type === 'outline',
    [styles.wide]: isWide,
  });

  return (
    <button onClick={onClick} className={buttonStyle} disabled={isDisabled}>
      {title}
    </button>
  );
}

export default Button;

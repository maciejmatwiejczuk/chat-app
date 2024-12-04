import classNames from 'classnames';
import styles from './loader.module.css';

interface LoaderProps {
  size: 'small' | 'medium' | 'large';
}

function Loader({ size = 'medium' }: LoaderProps) {
  const loaderStyle = classNames(styles.loader, {
    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',
  });

  return <div className={loaderStyle}></div>;
}

export default Loader;

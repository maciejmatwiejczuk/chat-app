import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styles from './error-page.module.css';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops!</h1>
      <p className={styles.message}>Sorry, an unexpected error has occurred.</p>
      <p className={styles.status}>
        <i>
          {isRouteErrorResponse(error)
            ? error.statusText || error.data?.message
            : 'Unknown error'}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;

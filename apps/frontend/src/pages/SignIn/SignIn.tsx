import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../components/_common/TextInput/TextInput';
import styles from './sign-in.module.css';
import Button from '../../components/_common/Button/Button';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Sign In</h2>

        <div className={styles.inputWrapper}>
          <TextInput value={username} setValue={setUsername} label="Username" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            value={password}
            setValue={setPassword}
            label="Password"
            type="password"
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button title="Sign in" size="small" type="fill" isWide={true} />
        </div>

        <p className={styles.bottomText}>
          Don't have an account yet?{' '}
          <Link to="/sign-up" className={styles.redirect}>
            Sign up here
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

export default SignIn;

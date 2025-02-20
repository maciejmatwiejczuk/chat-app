import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginDto } from '@chat-app/_common';
import styles from './sign-in.module.css';
import Button from '../../components/_common/Button/Button';
import FormInput from '../../components/_common/FormInput/FormInput';
import { useLogin } from '../../api/sessions';
import axios from 'axios';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  });

  const login = useLogin();
  const location = useLocation();

  async function onSubmit(data: LoginDto) {
    login.mutate(data);
  }

  function didValidationFail() {
    if (errors && Object.keys(errors).length !== 0) {
      return true;
    }

    return false;
  }

  function didAuthenticationFail() {
    if (axios.isAxiosError(login.error)) {
      if (login.error.status === 401) {
        return true;
      }
    }

    return false;
  }

  function renderErrorBox() {
    if (didValidationFail() || didAuthenticationFail()) {
      return (
        <div className={styles.errorBox}>Incorrect username or password.</div>
      );
    } else if (login.error) {
      return (
        <div className={styles.errorBox}>
          Unexpected error. Try again later.
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>Sign In</h2>

        {location.state?.message && (
          <div className={styles.infoBox}>{location.state.message}</div>
        )}

        {renderErrorBox()}

        <div className={styles.inputWrapper}>
          <FormInput
            {...register('username')}
            label="Username"
            isRequired={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('password')}
            label="Password"
            type="password"
            isRequired={true}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button
            title="Sign in"
            size="small"
            type="fill"
            isWide={true}
            isDisabled={isSubmitting}
          />
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

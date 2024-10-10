import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginDto } from '@chat-app/_common/schemas/sessions';
import styles from './sign-in.module.css';
import Button from '../../components/_common/Button/Button';
import FormInput from '../../components/_common/FormInput/FormInput';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  const location = useLocation();

  async function onSubmit(data: LoginDto) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>Sign In</h2>

        {location.state?.isRegistered && (
          <div className={styles.infoBox}>
            Your account was successfully registered. &nbsp; You can login now.
          </div>
        )}

        <div className={styles.inputWrapper}>
          <FormInput
            {...register('username')}
            label="Username"
            error={errors.username?.message}
            isRequired={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('password')}
            label="Password"
            type="password"
            error={errors.password?.message}
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

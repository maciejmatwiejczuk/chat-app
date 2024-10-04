import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateUserDto,
  CreateUserSchema,
} from '@chat-app/_common/schemas/users';
import Button from '../../components/_common/Button/Button';
import styles from './sign-up.module.css';
import FormInput from '../../components/_common/FormInput/FormInput';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserDto>({
    mode: 'onBlur',
    resolver: zodResolver(CreateUserSchema),
  });

  async function onSubmit(data: CreateUserDto) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>Sign Up</h2>

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
            {...register('email')}
            label="Email"
            error={errors.email?.message}
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
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('confirmPassword')}
            label="Confirm password"
            type="password"
            error={errors.confirmPassword?.message}
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
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.redirect}>
            Sign in here
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

export default SignUp;

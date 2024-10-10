import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateUserDto,
  CreateUserSchema,
} from '@chat-app/_common/schemas/users';
import Button from '../../components/_common/Button/Button';
import styles from './sign-up.module.css';
import FormInput from '../../components/_common/FormInput/FormInput';
import { useCreateUser } from '../../api/users';
import axios from 'axios';
import { FieldError } from '@chat-app/_common/types';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserDto>({
    mode: 'onBlur',
    resolver: zodResolver(CreateUserSchema),
  });

  const createUser = useCreateUser();
  const navigate = useNavigate();

  async function onSubmit(data: CreateUserDto) {
    createUser.mutate(data, { onSuccess: () => navigate('/sign-in') });
  }

  function getErrorFromResponse(fieldName: keyof CreateUserDto) {
    if (axios.isAxiosError(createUser.error)) {
      return createUser.error.response?.data?.errors.find(
        (err: FieldError) => err.field === fieldName
      )?.message;
    }
  }

  function getErrorMessage(fieldName: keyof CreateUserDto) {
    if (errors && Object.keys(errors).length !== 0) {
      return errors[fieldName]?.message;
    } else if (createUser.isError) {
      return getErrorFromResponse(fieldName);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>Sign Up</h2>

        <div className={styles.inputWrapper}>
          <FormInput
            {...register('username')}
            label="Username"
            error={getErrorMessage('username')}
            isRequired={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('email')}
            label="Email"
            error={getErrorMessage('email')}
            isRequired={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('password')}
            label="Password"
            type="password"
            error={getErrorMessage('password')}
            isRequired={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            {...register('confirmPassword')}
            label="Confirm password"
            type="password"
            error={getErrorMessage('confirmPassword')}
            isRequired={true}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button
            title="Sign in"
            size="small"
            type="fill"
            isWide={true}
            isDisabled={isSubmitting || createUser.isPending}
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

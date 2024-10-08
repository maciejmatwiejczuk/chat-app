import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../components/_common/TextInput/TextInput';
import Button from '../../components/_common/Button/Button';
import styles from './sign-up.module.css';

interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type FormActionType =
  | 'email_change'
  | 'username_change'
  | 'password_change'
  | 'confirm_password_change';

interface FormAction {
  type: FormActionType;
  value: string;
}

const initialState: FormState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

function reducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case 'email_change': {
      return { ...state, email: action.value };
    }
    case 'username_change': {
      return { ...state, username: action.value };
    }
    case 'password_change': {
      return { ...state, password: action.value };
    }
    case 'confirm_password_change': {
      return { ...state, confirmPassword: action.value };
    }
    default: {
      return state;
    }
  }
}

function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Sign Up</h2>

        <div className={styles.inputWrapper}>
          <TextInput
            value={state.email}
            setValue={(value) => dispatch({ type: 'email_change', value })}
            label="Email"
            type="email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            value={state.username}
            setValue={(value) => dispatch({ type: 'username_change', value })}
            label="Username"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            value={state.password}
            setValue={(value) => dispatch({ type: 'password_change', value })}
            label="Password"
            type="password"
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            value={state.confirmPassword}
            setValue={(value) =>
              dispatch({ type: 'confirm_password_change', value })
            }
            label="Confirm password"
            type="password"
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button title="Sign in" size="small" type="fill" isWide={true} />
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

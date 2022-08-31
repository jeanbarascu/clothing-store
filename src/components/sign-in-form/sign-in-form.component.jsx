import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInUserWithEmailAndPassword,
  signInGoogleProviderRedirect,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  // Email/Password sign in
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Invalid email or password!');
          break;
        default:
          console.error('user sign in failed', error);
      }
    }
  };

  // Google sign in
  const signInWithGoogleRedirect = async () => {
    try {
      await getRedirectResult(auth);
    } catch (error) {
      console.error('google sign in failed', error);
    }
  };

  useEffect(() => {
    signInWithGoogleRedirect();
  }, []);

  return (
    <div className="sign-up-container">
      <h2> Already have an account?</h2>
      <span>Sign in with your email and password!</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={signInGoogleProviderRedirect}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInGoogleProviderRedirect } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
} from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
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
      dispatch(emailSignInStart(email, password));
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
      dispatch(googleSignInStart());
    } catch (error) {
      console.error('google sign in failed', error);
    }
  };

  // useEffect(() => {
  //   const getUserFromGoogle = async () => {
  //     return signInGoogleProviderRedirect();
  //   };

  //   const { user } = getUserFromGoogle();

  //   // dispatch(signInSuccess());
  //   console.log(user);
  // }, []);

  return (
    <SignInContainer>
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

        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogleRedirect}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

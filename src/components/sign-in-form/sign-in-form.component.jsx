import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInUserWithEmailAndPassword,
  signInGoogleProviderRedirect,
  createUserDocumentFromAuth,
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
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {}
  };

  // Google sign in
  const signInWithGoogleRedirect = async () => {
    const response = await getRedirectResult(auth);

    if (response) {
      await createUserDocumentFromAuth(response.user);
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

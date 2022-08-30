import {
  signInGoogleProvider,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInGoogleProvider();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div>
        <h1>I am sign in page!</h1>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </>
  );
};

export default SignIn;

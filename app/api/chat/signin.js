
import React, { Fragment } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import styles from './signin.module.css';

// Remove TypeScript type annotations
const SignIn = ({ user }) => {
    const auth = getAuth();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(error => {
            console.error("Error during sign-in:", error);
        });
    };

    const handleSignOut = () => {
        signOut(auth).catch(error => {
            console.error("Error during sign-out:", error);
        });
    };

    return (
        <Fragment>
            {
                user ?
                    (
                        <button className={styles.signin} onClick={handleSignOut}>
                            Sign Out
                        </button>
                    ) : (
                        <button className={styles.signin} onClick={signInWithGoogle}>
                            Sign In
                        </button>
                    )
            }
        </Fragment>
    );
};

export default SignIn;
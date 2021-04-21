import firebase from 'firebase';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export interface AuthContextState {
  isUserLoggedIn: boolean;
  currentUser?: firebase.User,
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthContextState | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | undefined>(undefined);


  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsUserLoggedIn(true);
        setCurrentUser(user);

      } else {
        setIsUserLoggedIn(false);
      }
    })
    return () => unsubcribe();
  }, []);

  const signin = (email: string, password: string): void => {
    if (!isUserLoggedIn) {
      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log("logged in")
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }

  const signup = (email: string, password: string, name: string): void => {
    if (!isUserLoggedIn) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          let user = userCredential.user
          user?.updateProfile({
            displayName: name
          }).then(() => {
            console.log("updated profile")
          }).catch(error => {
            alert(error.message)
          })
          console.log("registered")
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }

  const logout = (): void => {
    if (isUserLoggedIn) {
      auth.signOut()
    } else {
      alert("user not logged in")
    }
  }


  return (
    <AuthContext.Provider value={{
      isUserLoggedIn,
      currentUser,
      signin,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthState(): AuthContextState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("auth context error")
  }
  return context
}
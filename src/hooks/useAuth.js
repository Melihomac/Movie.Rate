import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FirebaseConfig';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
      console.log('got a user: ', user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);
  return {user, loading};
}

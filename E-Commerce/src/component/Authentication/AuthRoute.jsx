// src/components/AuthRoute.jsx
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Track the user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        console.log('Unauthorized');
        setUser(null);
        setLoading(false);
        navigate('/'); // Or '/' based on your route
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <p>Loading...</p>; // You can show a spinner here

  return <>{children}</>;
};

export default AuthRoute;

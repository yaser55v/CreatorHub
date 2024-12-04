import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login, logout, fetchCurrentUser, register } from '@/store/slices/authSlice'; 
import type { RootState } from '@/store';
import type { LoginCredentials, RegisterData } from '@/types/auth'; 
import { useAppDispatch } from '@/hooks/useAppDispatch';

export function useAuth() {
  const dispatch = useAppDispatch();
  /* const dispatch = useDispatch(); */
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  const handleLogin = async (credentials: LoginCredentials, remember: boolean) => {
    try {
      const result = await dispatch(login(credentials)).unwrap();
      if (remember) {
        Cookies.set('token', result.token, { expires: 30 }); // 30 days
      } else {
        Cookies.set('token', result.token); // Session cookie
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      const result = await dispatch(register(data)).unwrap();
      Cookies.set('token', result.token); // Set session cookie by default for new registrations
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('token');
    navigate('/');
  };

  return {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister, // Add register to the returned object
    logout: handleLogout,
    isAuthenticated: !!user,
  };
}

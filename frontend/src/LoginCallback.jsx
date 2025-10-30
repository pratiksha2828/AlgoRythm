import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('login_token');
    const username = searchParams.get('login_username');
    if (token && username) {
      // Save token/username to localStorage or context as needed
      localStorage.setItem('github_token', token);
      localStorage.setItem('github_username', username);
      // Redirect to dashboard or home
      navigate('/dashboard'); // Ensure this route exists
    } else {
      // Handle error case
      console.error('No token or username found');
      navigate('/login'); // Redirect to login if something went wrong
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ color: '#fff', background: '#1e293b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default LoginCallback;
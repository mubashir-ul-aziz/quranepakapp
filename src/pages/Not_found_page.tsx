import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
function Not_found_page(props) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1); 
    }, 700);
    if (countdown === 0) {
      navigate('/');
    }
    return () => clearInterval(interval);
  }, [countdown, navigate]);
  return (
    <div className='not-found-component'>
      <h1> {props.heading_name} </h1>
      <p>Redirecting to the home page in <b> {countdown} seconds...</b></p>
      <Link to="/"> 
        <button>Home page</button>
      </Link>
    </div>
  );
}

export default Not_found_page;

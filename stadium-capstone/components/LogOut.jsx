import { useNavigate } from 'react-router-dom';

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setToken(null);

    alert('You have successfully logged out!');
    navigate('/');
  }

  return (
    <>
      <button onClick={handleSubmit}>Log Out</button>
    </>
  );
}

  //error on the route
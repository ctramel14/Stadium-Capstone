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
    <div className='logOutPage'>
      <h1>Are you sure you want to leave?</h1>
      <p>You still have more ballparks to visit.</p>
      <button id='logOutButton'   onClick={handleSubmit}>Log Out</button>
      </div>
    </>
  );
}

  //error on the route
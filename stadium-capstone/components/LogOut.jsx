export default function Logout({ setToken }) {
    async function handleSubmit(e) {
      e.preventDefault();
      setToken(null);
    }
  
    return (
      <>
        <button onClick={handleSubmit}>Log Out</button>
      </>
    );
  }
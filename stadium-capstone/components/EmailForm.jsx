import { useState, useEffect } from 'react'
import emailjs from 'emailjs-com';
import Modal from 'react-modal';

const EmailForm = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [email, setEmail] = useState('');
  
    useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    } else {
      setIsOpen(false);
    }
  }, []);

    const handleOpenModal = () => {
      setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_g96xmvt', 'contact_form', e.target, 'Iv5tnKOMN6ppXiL_t')
        .then((result) => {
          console.log(result.text);
          handleCloseModal();
        }, (error) => {
          console.log(error.text);
        });
    };
  
    return (
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal} className='email-modal'>
          <form className='email-form' onSubmit={handleSubmit}>
            <p onClick={handleCloseModal}>X</p>
          <h2>Want to stay up to date with all of the latest news?</h2>
            <input type="email" placeholder="Enter your email address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
            <button type="submit">Send</button> <br />
          </form>
        </Modal>
    );
  };
  
  export default EmailForm;
  
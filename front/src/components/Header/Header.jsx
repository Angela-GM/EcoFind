import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import './Header.css';
import NotificationBadge from '../NotificationBadge/NotificationBadge';
import { useLikesContext } from '../NotificationBadge/LikesContext';
import ModalComponent from '../Modal/ModalComponent';
import logo from '../../assets/images/logo-icon.png';
import { Link } from 'react-router-dom';



const Header = () => {
  const { likesCount, showNotification } =
    useLikesContext();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='header'>
      <div className='logo'>
        {/* Aquí puedes colocar la imagen de tu logo */}
        <Link to={"/"} >
        <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className='user-login'>
        {/* Aquí colocamos el botón de inicio de sesión con el ícono de usuario */}
      </div>
      <div className='icons'>
        <NotificationBadge onClick={handleOpenModal} count={likesCount}  showBadge={showNotification} />

        <ModalComponent isOpen={modalIsOpen} onClose={handleCloseModal} />
    
        {/* Icono de carrito de compras */}
        <IoCartOutline className='icon' size={30} />
        {/* Icono de lupa de buscador */}
        
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Modal from 'react-modal';
import '../../components/chat/Chat.css';

import { FaComments } from 'react-icons/fa'; 

Modal.setAppElement('#root');

const Chat = ({ firebaseConfig }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsModalOpen(true); // Abre el modal cuando se hace clic en el botón
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal cuando se hace clic en el botón de cerrar
  };

  useEffect(() => {
    // Configurar Firebase con la configuración de tu proyecto
    const firebaseConfigData = {
      apiKey: 'AIzaSyC1Em5qoH_AQmL9X8FwXhHFyr-je9Cpjq4',
      authDomain: 'ecofinds-29744.firebaseapp.com',
      databaseURL: 'https://ecofinds-29744-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'ecofinds-29744',
      storageBucket: 'ecofinds-29744.appspot.com',
      messagingSenderId: '248668404964',
      appId: '1:248668404964:web:d624e19bb10d9f23ae00f1',
    };

    firebase.initializeApp(firebaseConfigData);
  }, []);

  useEffect(() => {
    // Suscribirse a cambios en la base de datos y actualizar el estado de los mensajes
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.values(messageData);
        setMessages(messageList);
      }
    });

    return () => {
      // Desuscribirse de los cambios en la base de datos al desmontar el componente
      messagesRef.off();
    };
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Escribir el nuevo mensaje en la base de datos
      firebase.database().ref('messages').push({
        text: newMessage,
        username: username,
        timestamp: Date.now(),
      });

      // Limpiar el campo de entrada después de enviar el mensaje
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Modal */}


      <Modal
  isOpen={isModalOpen}
  onRequestClose={handleCloseModal}
  className="chat-modal"
  overlayClassName="chat-modal-overlay"
>
  {/* Encabezado del chat */}
  <div className="chat-header">
    <button onClick={handleCloseModal} className="close-modal-button">
      X
    </button>
  </div>

  {/* Sección de mensajes con scroll */}
  <div className="chat-messages">
    {messages.map((message) => (
      <div key={message.timestamp} className="message">
        <span>{message.username}: </span>
        <span className="timestamp">
          {new Date(message.timestamp).toLocaleString()}
        </span>
        <span>{message.text}</span>
      </div>
    ))}
  </div>

  {/* Separador */}
  <hr className="separator" />

  {/* Sección del formulario de input */}
  <div className="chat-form">
    <input
      type="text"
      value={username}
      onChange={handleUsernameChange}
      className="username-input"
      placeholder="Ingresa tu nombre de usuario"
    />
    <input
      type="text"
      value={newMessage}
      onChange={handleInputChange}
      className="message-input"
      placeholder="Escribe tu mensaje..."
    />
    <button onClick={handleSendMessage} className="send-button">
      Enviar
    </button>
  </div>
</Modal>


      <button onClick={handleChatButtonClick} className="chat-button">
      <FaComments size={30} />
      </button>
    </div>
  );
};

export default Chat;

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Tarjeta from '../../components/Tarjeta/Tarjeta';
import Banner from '../../components/Banner/Banner'; // Agrega la importación de Banner si es necesario

// IMAGENES
// import img1 from '../../assets/images/aceiterosa.jpg'

import Chat from '../../components/chat/Chat'

import firebaseConfig from '../../components/chat/Chat'


const HomeScreen = ({ handleLike,  }) => {
  return (
    <>
      <Header />
      <Banner />

      {/* Agrupa las instancias de Tarjeta en una sola sección */}
      <div className='tarjetas'>
        {/* Pasa las propiedades de handleLike y linkto correctamente */}
        <Tarjeta linkto="/products/producto-1" handleLike={handleLike} 
        
        // imgCard={img1}
        price={6.10 + ' €'}
        productName={'Aceite Rosa'}
        
        />
        
      </div>

      <Chat firebaseConfig={firebaseConfig}/>

      

      <Footer />
    </>
  );
};

export default HomeScreen;

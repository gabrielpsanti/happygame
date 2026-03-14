import Image from 'next/image';
import Fundo from '../../public/mario.jpg'
import Footer from './Footer';

const Inicio = () => {
  
  return (
    <div className="relative h-screen"> 
      <Image
        src={Fundo}
        alt="Descrição da imagem"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
        />
        {/*Camada escura para melhorar o contraste*/}
    <div className="absolute inset-0 bg-black opacity-50"></div> 
    <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-8">
        <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Nossa Página</h1>
        <p className="text-lg mb-8">
            Aqui você encontrará informações importantes os destinos mais incríveis do mundo.
            Aproveite para explorar e descobrir tudo o que temos para oferecer.
        </p>
        <a href="/destinos" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            Saiba Mais
        </a>
        </div>
    </div>

    <Footer/>
    </div>
    
    )
}

export default Inicio
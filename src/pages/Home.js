import brand_logo from '../assets/img/brands/brand_logo.svg'

const Home = ()=>{
    return(
        <section className="main-sec">
            <header className="home-header">
                <div className="home-brand-container">
                    <img src={brand_logo} alt="Fake Store Logo" className="home-brand-logo"/>
                    <div className="home-brand-text">
                        <h3 className="home-brand-title">FAKE 
                            <span className="home-brand-title home-brand-title--mod"> STORE</span>
                        </h3>
                        <h5 className="home-brand-subtitle">RAFA ALDAY DEV</h5>
                    </div>
                </div>
                
            </header>
            <article className='home-article'>
                <h1 className='welcome-header'>¡BIENVENIDO!</h1>
                <p className='welcome-text'>Me llamo Rafa Alday y esta app ha sido creada para mostrar mis conocimientos y habilidades en desarrollo web.</p>
                <p className='welcome-text'>Fake Store es una tienda online funcional, en la cual puedes agregar productos al carrito, acceder a tu cuenta o crear una nueva y realizar un procesode compra ficticio.</p>
                <p className='welcome-text'>En esta página inicial, te contaré algunas cosas interesantes acerca de la app, así como qué funcionalidades he implementado.</p>
            </article>
            <article className='home-article'>
                <h2 className='functions-header'>FUNCIONALIDADES</h2>
                <ul className='functions-list'>
                    <li className='functions-item'>Sitema de login: Puedes crear una cuenta y/o acceder con tu email y contraseña, tal como lo haces en cualquier aplicación web.</li>
                    <li className='functions-item'>Añadir productos al carrito: Puedes añadir productos al carrito como lo harías en una tienda real.</li>
                    <li className='functions-item'>Gestionar tu pedido: Puedes gestionar tu pedido</li>
                </ul>
            </article>
            <article className='home-article'>
                <h2 className='tecs-header'>TECNOLOGÍAS</h2>
                <ul className='tecs-list'>
                    <li className='tecs-item'>REACT: Toda la app ha sido creada con React desde cero.</li>
                    <li className='tecs-item'>FAKE STORE API: Todos los productos y categorías se cargan dinámicamente desde la API de <a href="https://fakestoreapi.com/" target='_blank' rel="noreferrer">fakestoreapi.com</a></li>
                    <li className='tecs-item'>FIREBASE: Todo el sistema de registro de usuarios es gestionado a través de Cloud Firestore</li>
                </ul>
            </article>
        </section>
    )
}

export default Home;
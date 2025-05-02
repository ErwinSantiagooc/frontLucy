const FooterCliente = () => {
    const footerNavs = [
     
        { title: 'Inicio', path: '/cliente' },
        { title: 'Productos', path: '/cliente/productos' },
        { title: 'PQR', path: '/cliente/pqr' },
        { title: 'Login', path: '/cliente/login' },
    ];

    return (
        <footer className="bg-slate-900 text-white w-full dark:border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-4">
                    <img src="/logo.png"  alt="Logo" className="w-16 h-16 mx-auto" />
                    <strong>Lucy Mundo de Pijamas</strong>
                    {/* <p className="leading-relaxed mt-2 text-[15px]">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p> */}
                </div>
                <ul className="flex flex-wrap justify-center mt-8 space-x-4">
                    {footerNavs.map((item, idx) => (
                        <li key={idx} className="hover:text-gray-300">
                            <a href={item.path}>{item.title}</a>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center">
                    <div className="text-center sm:text-left">&copy; {new Date().getFullYear()} Todos los derechos reservados por Lucy Mundo de Pijamas.</div>
                    {/* <ul className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="javascript:void()">
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>
        </footer>
    );
}

export default FooterCliente;

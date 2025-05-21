const Footer = () => {
    return (
        <footer className="bg-gray-800 text-black dark:text-white text-center py-4">
            <p className='text-center'>
                Univalle, todos los derechos reservados {new Date().getFullYear()}
            </p>
        </footer>
    )
}

export default Footer;
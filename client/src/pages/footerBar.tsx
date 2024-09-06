const FooterBar = (): JSX.Element => {
    return (
        <>
            <footer className="bg-white text-black text-center py-3" style={{ position: 'fixed', width: '100%', bottom: 0 }}>
                <div className="container">
                    <p className="mb-0">© 2024 Seu Site. Todos os direitos reservados.</p>
                    <p className="mb-0">Desenvolvido por E-devs</p>
                </div>
            </footer>
        </>
    )
}

export default FooterBar
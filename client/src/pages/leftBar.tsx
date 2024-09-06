import { useNavigate } from 'react-router-dom';

const LeftBar = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <>
            <div className="offcanvas offcanvas-start " data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Opções do Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <button type="submit" className="btn btn-primary w-100 mt-2" style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }} onClick={function () { navigate(`/cadastro/cadastroEmpresa`) }}>Cadastro de Empresas</button>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-sm btn-outline-secondary w-50"
                        style={{ borderRadius: "8px" }}
                        onClick={function () {
                            navigate(`/login/`)
                        }}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default LeftBar
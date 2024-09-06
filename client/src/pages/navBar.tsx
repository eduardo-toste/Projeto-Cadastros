import logo from '../assets/logo.png';
import alignJustifyFill from '@iconify-icons/mingcute/align-justify-fill';
import { Icon } from '@iconify/react';

const NavBar = (): JSX.Element => {
    return (
        <>
            <nav className="navbar fixed-top bg-body-secondary">
                <div className="container-fluid">
                    <div>
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                            <Icon icon={alignJustifyFill} width="30" height="30" />
                        </button>
                        <a className="navbar-brand" href="/home/home">
                            <img src={logo} width="50" height="50" style={{ borderRadius: "10px" }} />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
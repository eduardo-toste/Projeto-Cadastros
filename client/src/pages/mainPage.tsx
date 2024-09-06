import { Outlet } from "react-router-dom"
import FooterBar from "./footerBar"
import LeftBar from "./leftBar"
import NavBar from "./navBar"


const MainPage = (): JSX.Element => {
    return (
        <>
            <NavBar />
            <LeftBar />
            <div className="content-page">
                <Outlet />
            </div>
            <FooterBar />
        </>
    )
}

export default MainPage
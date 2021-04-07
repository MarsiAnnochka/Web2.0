import * as React from "react";
import Routes from "../../pages/routes";

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand btn-lg" href="/">ClubHouse</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">About us <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
                <ul className="navbar-nav mr-lg-2 btn-lg">
                    <li className="nav-item active">
                        <a className="nav-link" href={Routes.LOGIN}>Login <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href={Routes.SIGNUP}>Sign up <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

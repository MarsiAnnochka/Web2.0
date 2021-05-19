import * as React from "react";

export const NavbarAuth: React.FC = () => {
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
            </div>
        </nav>
    )
}
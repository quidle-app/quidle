import {Outlet} from "react-router";
import {Link} from "react-router-dom";

const Layout = () => (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Strona główna</Link>
                </li>
                <li>
                    <Link to="/auth">Zaloguj się</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
)

export default Layout;

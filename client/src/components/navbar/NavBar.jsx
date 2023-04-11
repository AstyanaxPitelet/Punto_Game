import { NavLink } from "react-router-dom";
import SignOut from "../connexion/SignOut";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

export default function NavBar() {

    const isAuth = useIsAuthenticated()

    const auth = useAuthUser()


    return (
        <div>
            {isAuth() && 
                <div className="navbar">
                    <div className="navbar-info">
                        <p>
                            {auth().email}
                        </p>
                    </div>
                    <div className="navbar-menu">
                        <NavLink to={'/profil'} >
                            Profil
                        </NavLink>
                        <NavLink to={'/room'} >
                            Jeu 
                        </NavLink>
                    </div>
                    <div className="navbar-signout">
                        <SignOut />
                    </div>
                </div>
            }
        </div>
    )
}
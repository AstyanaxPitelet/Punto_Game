import { NavLink } from "react-router-dom";
import SignOut from "../connexion/SignOut";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import axios from "axios"
import { useEffect, useState } from "react";

const api = "http://localhost:3001/punto"

export default function NavBar() {

    const isAuth = useIsAuthenticated()

    const auth = useAuthUser()

    const [user, setUser] = useState("")

    useEffect(() => {
        if(isAuth()) {
            let isDone = true 
            axios.post(`${api}/player/name`, {
                mail: auth().email
            }).then((response) => {
                if(isDone) {
                    setUser(response.data)
                }
            })
            return () => {
                isDone = false
            }
        }
    }, [])

    return (
        <div>
            {isAuth() && 
                <div className="navbar">
                    <div className="navbar-info">
                        <p>
                            Bonjour {user}
                        </p>
                    </div>
                    <div className="navbar-menu">
                        <NavLink to={'/'} >
                            Accueil
                        </NavLink>
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
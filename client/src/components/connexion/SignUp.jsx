import { useState } from "react"

export default function Register() {

    const [user, setUser] = useState(null)


    const handleMail = (e) => {
        setUser({
            ...user,
            mail: e.target.value
        })
    }

    const handleUser = (e) => {
        setUser({
            ...user,
            userName: e.target.value
        })
    }

    const handlePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value
        })
    }

    const signUp = () => {
        
    }
    
    return (
        <div className="register">
            <form>
               <input type="mail" placeholder="Adresse mail"  onChange={(e) => handleMail(e)} /> 
               <input type="text" placeholder="Nom d'utilisateur"  onChange={(e) => handleUser(e)} /> 
               <input type="password" placeholder="Mot de passe"  onChange={(e) => handlePassword(e)} /> 
               <button onClick={signUp}>Crée un compte</button>
            </form>
        </div>
    )

}
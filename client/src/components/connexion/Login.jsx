import { useState } from "react"

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleMail = (e) => {
        setUsername({
            ...username,
            mail: e.target.value
        })
    }

    const handlePassword = (e) => {
        setPassword({
            ...password,
            password: e.target.value
        })
    }

    const login = () => {
        
    }

    return (
        <div className="login">
            <form>
                <input type="mail" placeholder="Adresse mail" onChange={(e) => handleMail(e)} />
                <input type="mail" placeholder="Mot de passe" onChange={(e) => handlePassword(e)} /> 
                <button onClick={login}>Connexion</button>
            </form>
        </div>
    )

}
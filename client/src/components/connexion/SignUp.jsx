import { useState } from "react"
import { Navigate} from 'react-router-dom';
import axios from 'axios'



const api = 'http://localhost:3001/connexion'

export default function Register() {

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

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

    const signUp = (e) => {
        e.preventDefault()
        axios.post(`${api}/register`, user).then((reponse) => {
            setMessage(reponse.data)
        })
    }

    const setClassErrorBorder = () => {
        var border = ''
        if(message) {
            if(message.mail || message.userName || message.password) {
                border = 'border-red'
            } else {
                border = ''
            }
        }   
        return border 
    }
    
    return (
        <div className="frm-page">
            <div className="frm-container">
                <div className="frm-title">
                    <h3>Inscription</h3>
                </div>
                <form className="frm-contain">
                    <div className="frm-contain-content">
                        <div className="frm-contain-content-input">
                            <input className={setClassErrorBorder()} id="email" pattern=".+@globex\.com" placeholder="Adresse mail"  onChange={(e) => handleMail(e)} /> 
                            {message ? (<p>{message.mail}</p>) : ''}
                        </div>
                        <div className="frm-contain-content-input">
                            <input type="text" placeholder="Nom d'utilisateur"  onChange={(e) => handleUser(e)} /> 
                            {message ? (<p>{message.userName}</p>) : ''}
                        </div>
                        <div className="frm-contain-content-input">  
                            <input type="password" placeholder="Mot de passe"  onChange={(e) => handlePassword(e)} /> 
                            {message ? (<p>{message.password}</p>) : ''}
                        </div>
                    </div>
                    {message && message.invalidInformation ? (
                        <div className="invalidMessage">
                            <p>{message.invalidInformation}</p>
                        </div>
                    ) : ''}
                    <div className="frm-contain-button">
                        <button onClick={e => signUp(e)}>Créer un compte</button>
                        {message && message.validInformation ? (<Navigate to="/login" />) : '' }
                    </div>
                    
                </form>
            </div>
        </div>
    )

}
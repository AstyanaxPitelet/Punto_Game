import { useState } from "react"
import { Navigate } from "react-router-dom"
import axios from 'axios'

const api = 'http://localhost:3001/connexion'

export default function Login() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const handleMail = (e) => {
        setMail({
            ...mail,
            mail: e.target.value
        })
    }

    const handlePassword = (e) => {
        setPassword({
            ...password,
            password: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault()
        axios.post(`${api}/login`, {
            mail, password
        }).then((reponse) => {
            console.log(reponse.data)
            setMessage(reponse.data)
        }).catch((err) => {
            
        })
    }


    return (
        <div className="frm-page">
            <div className="frm-container">
                <div className="frm-title">
                    <h3>Connexion</h3>
                </div>
                <form className="frm-contain">
                    <div className="frm-contain-content">
                        <div className="frm-contain-content-input">
                            <input className={message ? 'border-red' : ''} id="email" placeholder="Adresse mail"  onChange={(e) => handleMail(e)} /> 
                        </div>
                        <div className="frm-contain-content-input">  
                            <input type="password" placeholder="Mot de passe"  onChange={(e) => handlePassword(e)} /> 
                        </div>
                    </div>
                    {message && message.invalidInformation ? (
                        <div className="invalidMessage">
                            <p>{message.invalidInformation}</p>
                        </div>
                    ) : ''}
                    <div className="frm-contain-button">
                        <button onClick={e => login(e)}>Connexion</button>
                        {message && message.validInformation ? (<Navigate to="/punto" />) : '' }
                    </div>
                    
                </form>
            </div>
        </div>
    )

}
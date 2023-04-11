import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useIsAuthenticated, useSignIn } from "react-auth-kit"


const api = 'http://localhost:3001/connexion'

export default function Login() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const signIn = useSignIn()

    const isAuth = useIsAuthenticated()

    const navigate = useNavigate()
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
            setMessage(reponse.data)
            if(reponse.data.validInformation) {
                const client = reponse.data.validInformation.user 
                const token = reponse.data.validInformation.token
                signIn({
                    token: token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { 
                        email: client.mail
                    }
                })
                if(isAuth) {
                    navigate('/room')
                }
            }       
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
                    </div>
                    
                </form>
            </div>
        </div>
    )

}
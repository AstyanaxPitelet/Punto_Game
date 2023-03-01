import { useState, useEffect } from "react"
import io from "socket.io-client"
import axios from 'axios'

const socket = io.connect('http://localhost:3001')

const api = 'http://localhost:3001/connexion'

export default function Register() {

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [information, setInformation] = useState(null)

    const sendMessage = () => {
        socket.emit("send_message", {message: "Hello from react"})
    }
    
    useEffect(() => {
        socket.on('receive_message', (data) => {
            alert(data.message)
        })
    }, [socket])

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
            console.log(reponse.data.information)
            setMessage(reponse.data)
        })
    }
    
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="frm-title">
                    <h3>Inscription</h3>
                </div>
                <form className="frm-contain">
                    <div className="frm-contain-content">
                        <div className="frm-contain-content-input">
                            <input className={message ? 'border-red' : ''} type="email" placeholder="Adresse mail"  onChange={(e) => handleMail(e)} /> 
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
                    <div className="frm-contain-button">
                        <button onClick={e => signUp(e)}>Créer un compte</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
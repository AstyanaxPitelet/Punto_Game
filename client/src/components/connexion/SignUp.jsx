import { useState, useEffect } from "react"
import io from "socket.io-client"
import axios from 'axios'

const socket = io.connect('http://localhost:3001')

const api = 'http://localhost:3001/connexion'

export default function Register() {

    const [user, setUser] = useState(null)

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

    const signUp = async () => {
        axios.post(`${api}/register`, user)
    }
    
    return (
        <div className="register">
            <div className="frm-login">
               <div className="login-title">

               </div>
               <div className="login-input">
                    <input type="mail" placeholder="Adresse mail"  onChange={(e) => handleMail(e)} /> 
                    <input type="text" placeholder="Nom d'utilisateur"  onChange={(e) => handleUser(e)} /> 
                    <input type="password" placeholder="Mot de passe"  onChange={(e) => handlePassword(e)} /> 
                    <button onClick={signUp}>Créer un compte</button>
               </div>
            </div>
        </div>
    )

}
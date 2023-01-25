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
            <div className="frm-login">
                <div className="login-title">
                    <h1>
                        <span style={{color: "#eb0c07"}}>C</span>  
                        <span style={{color: "#00b0ec"}}>o</span> 
                        <span style={{color: "#fcb201"}}>n</span> 
                        <span style={{color: "#72b80a"}}>n</span> 
                        <span style={{color: "#eb0c07"}}>e</span> 
                        <span style={{color: "#00b0ec"}}>c</span>
                        <span style={{color: "#eb0c07"}}>t</span>  
                        <span style={{color: "#eb0c07"}}>e</span> 
                        <span> </span> 
                        <span style={{color: "#fcb201"}}>t</span> 
                        <span style={{color: "#72b80a"}}>o</span> 
                        <span style={{color: "#eb0c07"}}>i</span>    
                    </h1>
                </div>
                <div className="login-input">
                    <input type="mail" placeholder="Adresse mail" onChange={(e) => handleMail(e)} />
                    <input type="password" placeholder="Mot de passe" onChange={(e) => handlePassword(e)} /> 
                    <button type="submit" onClick={login}>Connexion</button>
                </div>
            </div>
        </div>
    )

}
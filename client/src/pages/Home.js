import { NavLink } from "react-router-dom"

export default function Home() {

    return (
        <div className="home">
            <div className="home-title">
                <h1>
                    <span style={{color: "#eb0c07"}}>p</span>  
                    <span style={{color: "#00b0ec"}}>u</span> 
                    <span style={{color: "#fcb201"}}>n</span> 
                    <span style={{color: "#72b80a"}}>t</span> 
                    <span style={{color: "#eb0c07"}}>o</span>   
                </h1>    
            </div>
            <div className="home-button">
                <NavLink to="/login">Connexion</NavLink>
                <NavLink to="/register">Nouvelle utilisateur</NavLink>
            </div>
        </div>
    )

}
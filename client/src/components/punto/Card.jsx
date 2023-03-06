import { useState, useEffect } from "react";
import axios from 'axios'

const api = 'http://localhost:3001/punto'

export default function Card() {
    const [cards, setCards] = useState([])

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const dragStarted = (e, card) => {
        e.dataTransfer.setData("id", card._id)
        e.dataTransfer.setData("nombre", card.nombre)
        e.dataTransfer.setData("color", card.color)
    }

    useEffect(() => {
        axios.get(`${api}/cartes`).then((reponse) => {
            setCards(reponse.data)
        }).catch(err => {
            console.log(err)
        })
    })

    return (
        <div className="cards-list">
            {cards.map((card, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img 
                    key={index} 
                    id={card._id} 
                    numero={card.nombre}
                    draggable 
                    onDragStart={(e) => dragStarted(e, card)} 
                    onDragOver={(e) => handleDragOver(e)}
                    src={card.img}
                    className="img-card-punto"
                />
                    
            ))}
        </div>
    )
}
import { useState } from "react";

export default function Card() {

    const [cards, setCards] = useState([
        {id: 'red1', nombre: 1, color: 'red', img: "../img/card/r1.png"},
        {id: 'red2', nombre: 2, color: 'red', img: "../img/card/r2.png"},
        {id: 'red3', nombre: 3, color: 'red', img: "../img/card/r3.png"}
      ])

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const dragStarted = (e, card) => {
        e.dataTransfer.setData("id", card.id)
        e.dataTransfer.setData("nombre", card.nombre)
        e.dataTransfer.setData("color", card.color)
    }

    return (
        <div className="cards-list">
            {cards.map((card, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img 
                    key={index} 
                    id={card.id} 
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
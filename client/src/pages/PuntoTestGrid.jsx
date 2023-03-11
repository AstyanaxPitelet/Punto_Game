import { useRef, useState, useEffect } from "react"

import axios from 'axios'

const api = 'http://localhost:3001/punto'

export default function PuntoTestGrid() {
    
    const cardRef = useRef([])
    cardRef.current = []

    const [cards, setCards] = useState([])

    const [test, setTest] = useState({
        y: Array(12).fill(''),
        x: Array(12).fill('')
    })

    const handleDragStart = (e, card) => {
        try {
            e.dataTransfer.setData("id", card._id)
        } catch(err) {
            
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        const test = e.dataTransfer.getData("id")
        cardRef.current.forEach((card) => {
            if(card.id === test) {
                e.target.appendChild(card) 
            }
        })
        
    }

    useEffect(() => {
        axios.get(`${api}/cartes`).then((reponse) => {
            setCards(reponse.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const addToRef = el => {
        if(el && !cardRef.current.includes(el)) {
            cardRef.current.push(el)
        }
    }

    return (
        <div className="plato">
            <div className="test-grid-system">
                {test.y.map((r, idy) => (
                    <div key={idy}>
                        {test.x.map((r, idx) => (
                            <div className="test-grid-card" key={idx} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
                            
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="card-test" draggable onDragStart={(e) => {handleDragStart(e)}}>
                {cards.map((card) => {
                    return (
                        <img 
                            ref={addToRef}
                            id={card._id}
                            draggable 
                            onDragStart={(e) => handleDragStart(e, card)} 
                            onDragOver={(e) => handleDragOver(e)}
                            src={card.img}
                            className="img-card-punto" 
                            alt="" 
                        />
                    )
                })}
            </div>
        </div>
    )
}
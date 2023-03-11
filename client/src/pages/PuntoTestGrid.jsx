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
            e.dataTransfer.setData("numero", card.numero)
        } catch(err) {
            
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, x, y) => {
        const numero = e.dataTransfer.getData("numero")
        cardRef.current.forEach((card) => {
            if(card.id === e.dataTransfer.getData("id")) {
                if(e.target.firstChild!=null) {
                    const child = e.target.firstChild
                    if(numero > child.attributes.numero.value) {
                        e.target.removeChild(child)
                    } else {
                        return
                    }
                    
                }
                e.target.appendChild(card) 
            }
        }) 
        displayCoordinate(x, y)
    }

    const displayCoordinate = (xb, yb) => {
        try {
            const coordinate = [
                `${xb-1},${yb-1}`,`${xb-1},${yb}`,`${xb-1},${yb+1}`,
                `${xb},${yb-1}`,`${xb},${yb}`,`${xb},${yb+1}`,
                `${xb+1},${yb-1}`,`${xb+1},${yb}`,`${xb+1},${yb+1}`
            ]
            coordinate.forEach((element) => {
                document.getElementById(element).classList.add('visible')
                document.getElementById(element).style.removeProperty('visibility')
            })
        } catch(err) {
            
        }
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

    const isEqual = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b) ? true : false
    }

    const baseCoordinate = (x, y) => {
        const base = [
            [[6,5], [6,6]],
            [[5,5],[5,6]]
        ]
        var hidden = 'hidden'
        base.forEach((element) => {
            element.forEach(baseElement => {
                if(isEqual([x, y], baseElement)) {
                    hidden = 'visible'
                } 
            })
        })
        return hidden
    }

    return (
        <div className="plato">
            <div className="test-grid-system">
                {test.y.map((r, idy) => (
                    <div key={idy}>
                        {test.x.map((r, idx) => (
                            <div 
                                id={[idx, idy]}
                                style={{visibility: baseCoordinate(idx, idy)}} 
                                className="test-grid-card" 
                                key={idx} 
                                onDragOver={(e) => handleDragOver(e)} 
                                onDrop={(e) => handleDrop(e, idx, idy)}
                            >
                                
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
                            numero={card.numero}
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
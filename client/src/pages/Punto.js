import { useRef, useState, useEffect } from "react"

import axios from 'axios'

const api = 'http://localhost:3001/punto'

export default function Punto() {
    
    const cardRef = useRef([])
    cardRef.current = []

    const squareRef = useRef([])
    squareRef.current = []

    const [cards, setCards] = useState([])

    const [test, setTest] = useState({
        y: Array(12).fill(''),
        x: Array(12).fill('')
    })

    const [score, setScore] = useState({
        red: 0,
        orange: 0
    })

    const handleDragStart = (e, card) => {
        try {
            e.dataTransfer.setData("id", card._id)
            e.dataTransfer.setData("numero", card.numero)
            e.dataTransfer.setData("color", card.color)
        } catch(err) {
            
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, x, y) => {
        const numero = e.dataTransfer.getData("numero")
        const color = e.dataTransfer.getData("color")
        cardRef.current.forEach((card) => {
            if(card.id === e.dataTransfer.getData("id")) {
                if(e.target.firstChild!=null) {
                    const child = e.target.firstChild
                    if(numero > child.attributes.numero.value) {
                        child.hidden = true
                    } else {
                        return
                    }
                }
                displayScoreColor(color, numero)
                e.target.appendChild(card) 
            }
        }) 
        e.target.style = "background-color: #000;"
        displayCoordinate(x, y)
    }

    const displayScoreColor = (color, number) => {
        switch (color) {
            case "red":
                score.red += parseInt(number)
                break;
            case "orange": 
                score.orange += parseInt(number)
                break
            default:
                break;
        }
    }

    const displayCoordinate = (xb, yb) => {
        try {
            const coordinate = [
                `${xb-1},${yb-1}`,`${xb-1},${yb}`,`${xb-1},${yb+1}`,
                `${xb},${yb-1}`,`${xb},${yb}`,`${xb},${yb+1}`,
                `${xb+1},${yb-1}`,`${xb+1},${yb}`,`${xb+1},${yb+1}`
            ]
            squareRef.current.forEach((ref) => {
                coordinate.forEach((element) => {
                    if(ref.id === element) {
                        ref.classList.add('visible')
                        ref.style.removeProperty('visibility')
                    }
                })
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

    const addToRefSquare = el => {
        if(el && !squareRef.current.includes(el)) {
            squareRef.current.push(el)
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
        <div className="game">
            <div className="grid">
                <div className="grid-drop">
                    {test.y.map((r, idy) => (
                        <div className="collumn" key={idy}>
                            {test.x.map((r, idx) => (
                                <div 
                                    id={[idx, idy]}
                                    ref={addToRefSquare}
                                    style={{visibility: baseCoordinate(idx, idy)}} 
                                    className="square" 
                                    key={idx} 
                                    onDragOver={(e) => handleDragOver(e)} 
                                    onDrop={(e) => handleDrop(e, idx, idy)}
                                >
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="cards-player">
                <div className="cards-list" draggable onDragStart={(e) => {handleDragStart(e)}}>
                    {cards.map((card, index) => {
                        return (
                            <img 
                                key={index}
                                ref={addToRef}
                                id={card._id}
                                numero={card.numero}
                                color={card.color}
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
        </div>
    )
}
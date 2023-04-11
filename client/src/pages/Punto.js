import { useRef, useState, useEffect, useContext } from "react"
import { SocketContext } from '../socket'
import { useParams } from "react-router-dom"

import axios from 'axios'

const api = 'http://localhost:3001/punto'

export default function Punto() {
    
    const socket = useContext(SocketContext) 

    const params = useParams()

    const cardRef = useRef([])
    cardRef.current = []

    const squareRef = useRef([])
    squareRef.current = []

    const [players, setPlayers] = useState([])

    // const [currentPlayer, setCurrentPlayer] = useState(null)

    const [grid, setGrid] = useState({
        y: Array(12).fill(''),
        x: Array(12).fill('')
    })

    const [point, setPoint] = useState({
        red: 0,
        orange: 0,
        blue: 0,
        green: 0
    })

    useEffect(() => {
        socket.on('update-info', (info) => {
            let parentInfo = null
            cardRef.current.forEach((card) => {
                if(card.id === info.card.id) {
                    squareRef.current.forEach((parent) => {
                        if(parent.id === `${info.coordinate.x},${info.coordinate.y}`) {
                            parentInfo = parent
                            if(parent.firstChild!=null) {
                                const child = parent.firstChild
                                if(info.card.numero > child.attributes.numero.value) {
                                    displayPointColorLayer(
                                        child.attributes.color.value,
                                        child.attributes.numero.value
                                    )
                                    parent.removeChild(child)
                                } else {
                                    return
                                }
                            }
                            displayPointColor(info.card.color, info.card.numero)
                            parent.appendChild(card) 
                        }
                    })
                }        
            }) 
            parentInfo.style = "background-color: #000;"
            parentInfo.firstChild.draggable = false
            displayCoordinate(info.coordinate.x, info.coordinate.y)
        })
    }, [])

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
        let cardInfo = null
        cardRef.current.forEach((card) => {
            if(card.id === e.dataTransfer.getData("id")) {
                if(e.target.firstChild!=null) {
                    const child = e.target.firstChild
                    if(numero > child.attributes.numero.value) {
                        displayPointColorLayer(
                            child.attributes.color.value,
                            child.attributes.numero.value
                        )
                        e.target.removeChild(child)
                    } else {
                        return
                    }
                }
                displayPointColor(color, numero)
                e.target.appendChild(card) 
                cardInfo = card
            }
        }) 
        e.target.style = "background-color: #000;"
        e.target.firstChild.draggable = false
        displayCoordinate(x, y)
        socket.emit('update-game', {
            coordinate: {
                x: x,
                y: y
            },
            card: {
                id: cardInfo.id,
                numero: numero,
                color: color
            },
            room: params.idroom,
        })
        console.log(point)
    }

    
    const displayPointColorLayer = (color, number) => {
        switch(color) {
            case "red": 
                point.red = parseInt(number)
                break;
            case "orange": 
                point.orange = parseInt(number)
                break;
            case "blue": 
                point.blue = parseInt(number)
                break
            case "green": 
                point.green = parseInt(number)
                break
            default:
                break;
        }
    }

    const displayPointColor = (color, number) => {
        switch (color) {
            case "red":
                point.red += parseInt(number)
                break;
            case "orange": 
                point.orange += parseInt(number)
                break
            case "blue": 
                point.blue += parseInt(number)
                break
            case "green": 
                point.green += parseInt(number)
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
        socket.on('start-game-players-info', (value) => {
            setPlayers(value)
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

    // useEffect(() => {
    //     players.forEach((player) => {
    //         if(player.id === socket.id) {
    //             setCurrentPlayer(player)
    //         }
    //     })
    // }, [players])

    return (
        <div className="game">
            <div className="grid">
                <div className="grid-drop">
                    {grid.y.map((r, idy) => (
                        <div className="collumn" key={idy}>
                            {grid.x.map((r, idx) => (
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
            <div>
                {players.map((player, idx) => (
                    <div key={idx} style={{display: "inline-block", marginLeft: "2rem"}}>
                        <p>joueur : {player.numero}</p>
                                <div onDragStart={(e) => {handleDragStart(e)}}>
                                    {player.cards.map((card, index) => (
                                        <img 
                                            key={index}
                                            ref={addToRef}
                                            id={card._id}
                                            numero={card.numero}
                                            color={card.color}
                                            draggable={true} 
                                            onDragStart={(e) => handleDragStart(e, card)} 
                                            onDragOver={(e) => handleDragOver(e)}
                                            src={card.img}
                                            className="img-card-punto" 
                                            style={{position: "absolute", zIndex: index}}
                                            alt="" 
                                        />
                                    ))}
                                </div>
                    </div>
                ))}
            </div>
           
        </div>
    )
}
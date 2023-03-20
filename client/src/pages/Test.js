import { useState, useEffect } from "react"

import axios from "axios"

const api = 'http://localhost:3001/punto'

export default function Test() {

    const [cards, setCards] = useState([])

    const [players, setPlayers] = useState([
        { id: 0, username: "joueur 1", cards: [] },
        { id: 1, username: "joueur 2", cards: [] },
    ]) 

    const [neutral, setNeutral] = useState([])

    const [rule, setRule] = useState()

    useEffect(() => {
        let isDone = true 
        axios.post(`${api}/rule/player`, {
            nbPlayer: players.length
        }).then((response) => {
            if(isDone) {
                setRule(response.data)
            }
        })
        return () => {
            isDone = false
        }
    }, [])

    useEffect(() => {
       if(rule) {
        rule.colors.forEach((color, index) => {
            axios.post(`${api}/card/color`, {
                color: color 
            }).then((response) => {
                setCards(cards => [...cards , response.data]) 
                setPlayers((prev) => {
                    return prev.map((player) => {
                        if(player.id===index) {
                            return {
                                ...player,
                                cards: response.data
                            }
                        } else {
                            return player
                        }
                    })
                })
                
            })
        });
       }
    }, [rule])

    return (
        <div>
            {players.map((player, idx) => (
                <div key={idx}>
                    <p>{player.username}</p>
                    {player.cards.map((card, id) => (
                        <img
                            key={id}
                            src={card.img}
                            className="img-card-punto" 
                            alt="" 
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
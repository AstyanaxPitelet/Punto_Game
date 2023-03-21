import { useState, useEffect } from "react"

import axios from "axios"

const api = 'http://localhost:3001/punto'

export default function Test() {

    const [players, setPlayers] = useState([
        { numero: 1, username: "joueur 1", cards: [] },
        { numero: 2, username: "joueur 2", cards: [] },
        { numero: 3, username: "joueur 2", cards: [] },
        { numero: 4, username: "joueur 2", cards: [] },
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
        let isDone = true
        if(rule) {
            rule.deck.forEach((deck, index) => {
                axios.post(`${api}/card/id`, {
                    idCard: deck
                }).then((card) => {
                    if(isDone) {
                        setPlayers((prev) => {
                            return prev.map((player) => {
                                if(player.numero===index+1) {
                                    return {
                                        ...player,
                                        cards: card.data
                                    }
                                } else {
                                    return player
                                }
                            })
                        })
                    }
                })
            });
        }
        return () => {
            isDone = false
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
import { useState, useEffect } from "react"

import axios from "axios"

const api = 'http://localhost:3001/punto'

export default function Test() {

    const [players, setPlayers] = useState([
        { id: 1, username: "joueur 1", colors: ['orange', 'red'], cards: [] },
        { id: 2, username: "joueur 2", colors: ['blue', 'green'], cards: [] },
    ])  

    const [cards, setCards] = useState([])

    const [rule, setRule] = useState(null)

    useEffect(() => {
        axios.post(`${api}/rule/player`, {
            nbPlayer: players.length
        }).then((reponse) => {
            setRule(reponse.data)
            players.forEach((player) => {
                axios.post(`${api}/card/color`, {
                    color: player.colors
                }).then((card) => {
                    setCards(card.data)
                    player.cards = card.data 
                })
            })
        })
    }, [players])

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
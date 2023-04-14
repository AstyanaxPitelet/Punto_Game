import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SocketContext } from '../socket'
import axios from "axios"

const api = 'http://localhost:3001/punto'

export default function Lobby() {

    const socket = useContext(SocketContext) 

    const params = useParams()

    const [players, setPlayers] = useState([])

    const [hote, setHote] = useState(false)

    const [message, setMessage] = useState(null)

    const [timer, setTimer] = useState()

    const startButton = useRef()

    const navigate = useNavigate()

    const [rule, setRule] = useState()

    useEffect(() => {
        let isDone = true 
        socket.on('lobby-info', (value) => {
            if(isDone) {
                setPlayers(prev => [...prev, value])
            }
        })
        return  () => {
            isDone = false
        }
    }, [])

    useEffect(() => {
        if(players) {
            players.forEach((player, index) => { 
                if(player.hote) {
                    setHote(player.hote)
                }
            })
        }
    }, [players])

    useEffect(() => {
        let isDone = true 
        if(parseInt(params.nbplayer) > 1) {
            axios.post(`${api}/rule/player`, {
                nbPlayer: parseInt(params.nbplayer)
            }).then((response) => {
                if(isDone) {
                    setRule(response.data[0].deck)
                }
            })
        }
        return () => {
            isDone = false
        }
    }, [])

    useEffect(() => {
        let isDone = true
        if(rule) {
            rule.forEach((deck, index) => {
                axios.post(`${api}/card/id`, {
                    idCard: deck
                }).then((card) => {
                    if(isDone) {
                        socket.emit('test-e', {
                            id: socket.id,
                            numero: index+1,
                            room: params.idroom
                        })
                        socket.on('test', (value)=>{
                            setPlayers((prev) => prev.map((player, index) => {
                                if(player.id===value.id) {
                                    return {
                                        ...player,
                                        numero: index+1
                                    }
                                } else {
                                    return player
                                }
                            }))
                        })
                        socket.emit('give-card', {
                            id: socket.id,
                            room: params.idroom,
                            cards: card.data,
                            numero: index+1,
                        })
                        
                        socket.on('give-card-info', (value) => {
                            setPlayers((prev) => {
                                return prev.map((player, index) => {
                                    if(player.numero===value.numero) {
                                        return {
                                            ...player,
                                            cards: value.cards,
                                        }
                                    } else {
                                        return player
                                    }
                                })
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

    
    /**
     * Description placeholder
     * 
     * Permet de lancer le timer puis lance la partie
     * 
     * @date 4/12/2023 - 10:36:52 AM
     * @author Astyanax Pitelet
     *
     * @param {*} e
     */
    const handleClickStart = (e) => {        
        if(players.length===parseInt(params.nbplayer)) {
            startButton.current.disabled = true
            let cpt = 4
            let interval = setInterval(() => {
                cpt--
                socket.emit('start-game', {
                    compteur: cpt,
                    room: params.idroom
                })
                socket.on('start-info', (value) => {
                    setTimer(value)
                })
                if(cpt===0) {
                    window.clearInterval(interval)
                    socket.emit('start-game-players', {
                        room: params.idroom,
                        players: players
                    })
                    navigate(`/punto/${params.idroom}/${params.nbplayer}`)
                }
            }, (1000));
            
        } else {
            setMessage('Vous pourrez lancer la partie quand tous les joueurs seront connecter')
        }
    }

    useEffect(() => {
        socket.on('start-info', (value) => {
            setTimer(value)
        })
        if(timer===0) {
            navigate(`/punto/${params.idroom}/${params.nbplayer}`)
        }
    })

    return (
        <div className="lobby-wait">
            <div className="title-lobby">
                <h1>Salle d'attente</h1>
            </div>
            <div className="timer">
            {timer && (
                    <>
                        <h6>Lancement de la partie dans</h6>
                        <p>{timer}</p>
                    </>
                )}
            </div>
            <div className="lobby-wait-content">
                <div className="lobby-infos">
                    <p>Room code : { params.idroom }</p>
                    <p>Nombre de joueur : {players.length}/{params.nbplayer}</p>
                </div>
                <div className="lobby-content">
                    <h4>Liste des joueurs</h4>
                    {players.map((player, idx) => (
                        <p key={idx}>{player.user}</p>
                    ))}
                </div>
                <div className="lobby-start-game">
                    {hote && (
                        <button ref={startButton} onClick={e => handleClickStart(e)}>
                            Start game
                        </button>
                    )}
                </div>
                <div className="message-error">
                    {message && (
                        <p className="message-info">{message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
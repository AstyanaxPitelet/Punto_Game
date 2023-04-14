import { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SocketContext } from '../socket'
import axios from "axios"
import { useAuthUser } from "react-auth-kit"

const api = 'http://localhost:3001/punto'

export default function Room() {

    const socket = useContext(SocketContext) 

    const createRoom = useRef()

    const navigate = useNavigate()

    const [room, setRoom] = useState(null)

    const [redirect, setRedirect] = useState(false)

    const [nbPlayerChoice, setNbPlayerChoice] = useState([2, 3, 4])

    const [nbPlayer, setNbPlayer] = useState(2)

    const auth = useAuthUser()

    const handleClickCreate = () => {
      if(room) {
        axios.post(`${api}/player/name`, {
          mail: auth().email
        }).then((response) => {
          socket.emit('create-room', {
            id: socket.id,
            room: room,
            user: response.data,
            cards: [],
            numero: 0,
            hote: true,
            turn: true
          })
        })
        navigate(`/room/${room}/${nbPlayer}`)
      }
    }

    const handleClickJoin = () => {
      if(room) {
        axios.post(`${api}/player/name`, {
          mail: auth().email
        }).then((response) => {
          socket.emit('join-room', {
            id: socket.id,
            room: room,
            user: response.data,
            cards: [],
            numero: 0,
            hote: false,
            turn: false
          })
        })
        navigate(`/room/${room}/${nbPlayer}`)
      }
    }

    const handleChangeCreate = (e) => {
      const roomSize = e.target.value.split('').length
      if(roomSize>4 || roomSize<4) {
        e.target.nextSibling.disabled = true
      } else {
        e.target.nextSibling.disabled = false
        setRoom(e.target.value)
      }
    }

    

    return (
        <div className='room'>
          <div ref={createRoom} className="create-room">
            <div className="room-saisie">
              <input onChange={e => handleChangeCreate(e)} placeholder='Exemple : 1234' type="text" />
              <select onChange={e => setNbPlayer(e.target.value)} value={nbPlayer}>
                {nbPlayerChoice.map((nb, index) => (
                  <option key={index}>{nb}</option>
                ))}
              </select>
              <button onClick={handleClickCreate}>Create room</button>
              <button onClick={handleClickJoin}>Join room</button>
            </div>
          </div>
        </div>
    )

}
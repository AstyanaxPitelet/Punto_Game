import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

export default function Room() {

    const joinRoom = useRef()

    const createRoom = useRef()

    const createRoomValue = useRef()

    const joinRoomValue = useRef()

    const [room, setRoom] = useState(null)

    const handleJoin = () => {
      createRoom.current.style = "display: none"
      joinRoom.current.style.removeProperty("display")
    }

    const handleCreate = () => {
      joinRoom.current.style = "display: none"
      createRoom.current.style.removeProperty("display")
    }

    const handleClickCreate = () => {
      const room = createRoomValue.current.value
      if(room) {
        console.log(room)
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
              <input ref={createRoomValue} onChange={e => handleChangeCreate(e)} placeholder='Exemple : 1234' type="text" />
              <button onClick={handleClickCreate}>Create room</button>
            </div>
            <div className="room-button">
              <button onClick={handleJoin} >Join room</button>
            </div>
          </div>
          <div ref={joinRoom} className="create-room" style={{display: 'none'}}>
            <div className="room-saisie">
              <input placeholder='Exemple : 1234' type="text" />
              <button>Join room</button>
            </div>
            <div className="room-button">
              <button onClick={handleCreate}>Create room</button>
            </div>
          </div>
        </div>
    )

}
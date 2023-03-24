import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

export default function Room() {

    const joinRoom = useRef()

    const createRoom = useRef()

    const handleJoin = () => {
      createRoom.current.style = "display: none"
      joinRoom.current.style.removeProperty("display")
    }

    const handleCreate = () => {
      joinRoom.current.style = "display: none"
      createRoom.current.style.removeProperty("display")
    }

    return (
        <div className='room'>
          <div ref={createRoom} className="create-room">
            <div className="room-saisie">
              <input placeholder='Exemple : 1234' type="text" />
              <button>Create room</button>
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
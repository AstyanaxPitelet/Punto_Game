import React, { useState } from "react"
import Square from "./Square";
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';


export default function Punto() {

    const [grid, setGrid] = useState({
        collumn: Array(6).fill(''),
        size: Array(6).fill('')
    })

    
    return (
        <div className="grid">
            <Droppable droppableId="square">
                {provided => (
                    <div className="grid-drop">
                        {grid.collumn.map((c, index) => (
                            <div className="board-row" key={index}>
                                {grid.size.map((s, index) => (
                                    <Square
                                        {...provided.droppableProps}
                                        ref={provided.innerRef} />
                                ))}
                            </div>
                        ))}
                    </div>   
                )}
            </Droppable>
        </div>
    )
}
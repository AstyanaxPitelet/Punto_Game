import { useState } from "react"


export default function Square() {

    const [grid, setGrid] = useState({
            collumn: Array(6).fill(''),
            size: Array(6).fill('')
        }
    )

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        const idCard = document.getElementById(e.dataTransfer.getData("id"))
        const nombreCard = e.dataTransfer.getData("nombre")
        const colorCard = e.dataTransfer.getData("color")
        console.log(nombreCard)
        e.target.appendChild(idCard)
    }

    return (
        <div className="grid-drop">
            {grid.collumn.map((c, idx) => (
                <div className="board-row" key={idx}>
                    {grid.size.map((s, index) => (
                         <div onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}  className="square" key={index}>
                            
                         </div>           
                    ))}
                </div>
            ))}
        </div>   
    )
}
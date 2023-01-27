import { useState } from "react"


export default function Square() {

    const [grid, setGrid] = useState(Array(144).fill(''))

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
            {grid.map((c, idx) => (
                <div onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}  className="square" key={idx}>
                            
                </div>
            ))}
        </div>   
    )
}
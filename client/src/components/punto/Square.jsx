/* eslint-disable no-lone-blocks */
import { useState } from "react"


export default function Square() {

    const [grid, setGrid] = useState({
        row: Array(12).fill(''),
        collums: Array(12).fill('')
    })

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
            {grid.row.map((r, idr) => (
                <div className="row" key="idr">
                  {grid.collums.map((c, idc) => (
                    <div className="col square" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}  key={idc}>
                            
                    </div>
                  ))}  
                </div>
            ))}
        </div>   
    )
}
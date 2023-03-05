/* eslint-disable no-lone-blocks */
import { useState } from "react"
import Square from "./Square"


export default function Grid() {

    const [grid, setGrid] = useState({
        y: Array(12).fill(''),
        x: Array(12).fill('')
    })

    

    return (
        <div className="grid-drop">
            {grid.y.map((r, idy) => (
                <div className="row" key={idy}>
                  {grid.x.map((c, idx) => (
                    <Square x={idx} y={idy} key={idx} />
                  ))}  
                </div>
            ))}
        </div>   
    )
}
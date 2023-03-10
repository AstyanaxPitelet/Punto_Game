import { useState } from "react"


export default function PuntoTestGrid() {
    
    const [test, setTest] = useState({
        y: Array(12).fill(''),
        x: Array(12).fill('')
    })

    return (
        <div className="test-grid-system">
            {test.y.map((r, idy) => (
                <div className="collumn" key={idy}>
                  {test.x.map((c, idx) => (
                    <div className="test-grid-card"  id={[idx, idy]} x={idx} y={idy} key={idx}>
                        {idx} - {idy}
                    </div>
                  ))}  
                </div>
            ))}
        </div>
    )
}
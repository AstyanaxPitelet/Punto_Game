import { useEffect } from "react"


export default function Square(props) {

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        const idCard = document.getElementById(e.dataTransfer.getData("id"))
        const nombreCard = e.dataTransfer.getData("nombre")
        const colorCard = e.dataTransfer.getData("color")
        e.target.appendChild(idCard)
    }

    
    const baseCoordinate = () => {
        const base = [
            [[6,5], [6,6]],
            [[5,5],[5,6]]
        ]
        var hidden = 'hidden'
        base.forEach((element) => {
            element.forEach(baseElement => {
                if(isEqual([props.x, props.y], baseElement)) {
                    hidden = 'visible'
                } 
            })
        })
        return hidden
    }

    useEffect(() => {

    })

    const isEqual = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b) ? true : false
    } 
    

    const displayCoordinate = () => {
        const xb = props.x
        const yb = props.y
        const coordinate = [
            [[xb-1,yb-1],[xb-1,yb],[xb-1,yb+1]],
            [[xb,yb-1],[xb,yb],[xb,yb+1]],
            [[xb+1,yb-1],[xb+1,yb],[xb+1,yb+1]]
        ]
        console.log(coordinate)
    }

    return (
        <div className="col square" style={{visibility: baseCoordinate()}} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
                       
        </div>
    )
}
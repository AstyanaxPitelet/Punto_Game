import { useEffect, useRef, useState } from "react"


export default function Square(props) {

    const [numero, setNumero] = useState(0)

    const ref = useRef()

    const handleDragOver = (e) => {
        e.preventDefault()
        
    }

    const handleDragEnd = (e) => {
        try {
            e.preventDefault()
            console.log(e.target.firstChild.attributes.numero.value)
        } catch(err) {}
    }

    const handleDrop = (e) => {
        const idCard = document.getElementById(e.dataTransfer.getData("id"))
        const nombreCard = e.dataTransfer.getData("nombre")
        const colorCard = e.dataTransfer.getData("color")
        e.target.appendChild(idCard)
        ref.current.firstChild.draggable = false
        displayCoordinate()
        console.log(ref.current.firstChild.attributes.numero.value)
        console.log(e.target.firstChild.attributes.numero.value)
        console.log('drop : ' + nombreCard)
        // if(nombreCard > ref.current.firstChild.attributes.numero.nodeValue) {
        //     ref.current.firstChild.classList.add('hidden')
        // }
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

    

    const isEqual = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b) ? true : false
    } 
    

    const displayCoordinate = () => {
        const xb = props.x
        const yb = props.y
        const coordinate = [
            `${xb-1},${yb-1}`,`${xb-1},${yb}`,`${xb-1},${yb+1}`,
            `${xb},${yb-1}`,`${xb},${yb}`,`${xb},${yb+1}`,
            `${xb+1},${yb-1}`,`${xb+1},${yb}`,`${xb+1},${yb+1}`
        ]
        try {
            coordinate.forEach((element) => {
                document.getElementById(element).classList.add('visible')
                document.getElementById(element).style.removeProperty('visibility')
            })
        } catch(err) {
            
        }
    }

    return (
        <div 
            ref={ref} 
            id={props.id} 
            className="col square" 
            style={{visibility: baseCoordinate()}} 
            onDragOver={(e) => handleDragOver(e)} 
            onDrop={(e) => handleDrop(e)}
            onDragEnter={(e) => handleDragEnd(e)}
        >
                       
        </div>
    )
}
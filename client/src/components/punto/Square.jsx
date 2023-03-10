import { useRef, useState } from "react"


export default function Square(props) {

    const ref = useRef()

    const [card, setCard] = useState(null)


    const handleDragOver = (e) => {
        e.preventDefault()
        console.log(e.timeStamp/e.timeStamp)
        if(e.target.firstChild!=null) {
            e.target.style = "border: 1px solid var(--border-input); background-color: black"
            setTimeout(() => {
                e.target.style = "border: 1px solid black; background-color: black"
            }, 1000)
        }
    }

    const handleDrop = (e) => {
        const idCard = document.getElementById(e.dataTransfer.getData("id"))
        if(e.target.firstChild!=null) {
            if(idCard.attributes.numero.value > card.numero) {
                ref.current.removeChild(document.getElementById(card.id))
            } 
        }
        setCard({
            id: idCard.attributes.id.value,
            numero: idCard.attributes.numero.value,
            color: idCard.attributes.color.value
        })
        e.target.appendChild(idCard)
        ref.current.style = "background-color: #000;"
        ref.current.firstChild.draggable = false
        displayCoordinate()
        e.preventDefault()
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
            >
                       
        </div>
    )
}
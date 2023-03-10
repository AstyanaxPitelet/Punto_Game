import { useRef, useState } from "react"


export default function Square(props) {

    const ref = useRef()

    const [card, setCard] = useState(null)
    const [saveCard, setSaveCard] = useState([])


    const handleDragOver = (e) => {
        try {
            e.preventDefault()
            if(e.target.firstChild!=null) {
                e.target.style = "transition: 0.2s ease; width: 100px;"
            }
        } catch(err) {

        }
    }

    const handleDropCapture = (e) => {
        try {
            e.target.style = "width: 60px;"
            const idCard = document.getElementById(e.dataTransfer.getData("id"))
            if(idCard.attributes.numero.value > card.numero) {
                saveCard.push(card)
                ref.current.removeChild(document.getElementById(card.id))
            } else {
                console.log('non')
            }
        } catch(err) {

        }
    }

    const handleDrop = (e) => {
        const idCard = document.getElementById(e.dataTransfer.getData("id"))
        setCard({
            id: idCard.attributes.id.value,
            numero: idCard.attributes.numero.value,
            color: idCard.attributes.color.value
        })

        e.target.appendChild(idCard)
        console.log(saveCard)
        
        ref.current.firstChild.droppable = false
        displayCoordinate()
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

    // const controlCard = () => {

    // }

    return (
        <div 
            ref={ref} 
            id={props.id} 
            className="col square" 
            style={{visibility: baseCoordinate()}} 
            onDragOver={(e) => handleDragOver(e)} 
            onDrop={(e) => handleDrop(e)}    
            onDropCapture={(e) => handleDropCapture(e)} 
            >
                       
        </div>
    )
}
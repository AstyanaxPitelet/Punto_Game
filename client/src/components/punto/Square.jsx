

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

    const displayCoordinate = () => {
        const xb = props.x 
        const yb = props.y
        const coordinate = [
            [[xb-1,yb-1],[xb-1,yb],[xb-1,yb+1]],
            [[xb,yb-1],[xb,yb],[xb,yb+1]],
            [[xb+1,yb-1],[xb+1,yb],[xb+1,yb+1]]
        ]
        coordinate.forEach((element) => {
            console.log(element)
        })
    }

    return (
        <div className="col square" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
                       
        </div>
    )
}
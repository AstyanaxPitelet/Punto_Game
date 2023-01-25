import { useState } from "react";

const colors = [
    '#eb0c07',
    '#00b0ec',
    '#fcb201',
    '#72b80a',
]

export default function PuntoTitle({ titleImport }) {

    const [title, setTitle] = useState(
        titleImport.split('')
    )

    const randomWord = () => {
        

    }

    return (
        <>
            <h1>
                {(title.map((letter) => (
                    <span style={{color: ""}}>
                        {letter}
                    </span>
                )))}
            </h1>
        </>
    )

}
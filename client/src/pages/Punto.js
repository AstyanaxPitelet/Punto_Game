import Square from '../components/punto/Card';
import Card from '../components/punto/Square';

export default function Punto() {
    
    return (
        <div className="game">
            <div className="grid">
                <Card />
            </div>
            <div className="cards-player">
                <Square />
            </div>
        </div>
    )
}
import Card from '../components/punto/Card';
import Grid from '../components/punto/Grid';

export default function Punto() {
    
    return (
        <div className="game">
            <div className="grid">
                <Grid />
            </div>
            <div className="cards-player">
                <Card />
            </div>
        </div>
    )
}
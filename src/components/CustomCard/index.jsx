import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FavoritesContext } from '../../providers/favorites';

import './styles.css';


export default function CustomCard(props) {
    // useContext = avoiding unnecessary data usage (useState)
    const { favorites, setFavorites } = useContext(FavoritesContext);

    function favoriteHandler() {
        if (props.favorited) {
            // remove logic
            setFavorites(favorites.filter(item => item.id !== props.movie.id));
        } else {
            setFavorites([...favorites, props.movie]);
        }
    }

    return <Card className='custom-card'>
        <span class={`material-icons-outlined custom-icon ${ props.favorited ? 'favorited' : ''}`} onClick={() => favoriteHandler() }>star</span>
        {/* Sending props information from father to son */}
        <Card.Img variant="top" src={props.movie.urlImg} className="custom-image" />
        <Card.Body>
            <Card.Title>{props.movie.titulo}</Card.Title>
            <Card.Text>{props.movie.descricao}</Card.Text>
            {/* Sending props information from son to father */}
            <Button variant="primary" onClick={() => props.openDetails(props.movie)}>Detalhes</Button>
        </Card.Body>
    </Card>
}
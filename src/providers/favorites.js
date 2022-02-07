import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const FavoritesContext = createContext([]);

export const FavoritesProvider = props => {
    const [favorites, setFavorites] = useLocalStorage('favoritedMovies', []);

    // Send favorites to use in all application
    return <FavoritesContext.Provider value={{favorites, setFavorites}}>
        {/* Children = other components added inside */}
        {props.children}
    </FavoritesContext.Provider>
}
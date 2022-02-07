// Custom Hook
// 1 - Verify what's comming
// 2 - Save information in cache on navigator (localStorage / cookies) = no sensible data as shopping card

import { useEffect, useState } from 'react';

export default function useLocalStorage(key, favoritedMovies) {
    // It will be executed everytime we try to setLocalStorage
    const [localStorage, setLocalStorage] = useState(() => {
        let value; 
        try {
            // get item form localStorage and convert to a JS object
            value = JSON.parse(window.localStorage.getItem(key) || String(favoritedMovies));
        } catch (error) {
            value = favoritedMovies;
        }
        return value;
    });

    useEffect(() => {
        // Save items on localStorage after converting them for a JSON
        window.localStorage.setItem(key, JSON.stringify(localStorage));
    }, [key, localStorage])

    return [localStorage, setLocalStorage]
}
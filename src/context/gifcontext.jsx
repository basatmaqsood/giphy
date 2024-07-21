import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();
const GifProvider = ({children})=>{
    const [gif, setGif] = useState([]);
    const [filter,setFilter]   = useState('gifs');
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (gifid)=>{
        let result;
        if(favorites.includes(gifid)){
            result = favorites.pop(gifid);
            setFavorites(results);
        }
        setFavorites([...favorites,gifid]);
    }

    console.log(import.meta.env.VITE_API_KEY);
    const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);
    return <GifContext.Provider value={{gf,gif,setGif,filter, setFilter, favorites,addToFavorites}}>{children}</GifContext.Provider>
}
export const GifState = ()=>{
    return useContext(GifContext);
};
export default GifProvider;
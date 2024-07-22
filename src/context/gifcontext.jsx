/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();
const GifProvider = ({children})=>{
    const [gif, setGif] = useState([]);
    const [filter,setFilter]   = useState('gifs');
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (gifid)=>{

        if(favorites.includes(gifid)){
            const updatedFavorites = favorites.filter((itemId)=>{itemId != gifid})
            localStorage.setItem("FavoriteGifs",JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        }else{
            const updatedFavorites = [...favorites,gifid];
            localStorage.setItem("FavoriteGifs",JSON.stringify(updatedFavorites));
            setFavorites([...favorites,gifid]);
        }
    }


    useEffect(()=>{
        const favorites = JSON.parse(localStorage.getItem("FavoriteGifs")) || [];
        setFavorites(favorites);
    },[])

    console.log(import.meta.env.VITE_API_KEY);
    const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);
    return <GifContext.Provider value={{gf,gif,setGif,filter, setFilter, favorites,addToFavorites}}>{children}</GifContext.Provider>
}
export const GifState = ()=>{
    return useContext(GifContext);
};
export default GifProvider;
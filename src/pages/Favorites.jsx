import { useEffect, useState } from "react";
import { GifState } from "../context/gifcontext"
import Gif from "../components/Gif";


const Favorites = () => {
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const {gf,favorites} = GifState();

  const fetchFavoriteGifs = async ()=>{
    const {data} = await gf.gifs(favorites);
    setFavoriteGifs(data);
  }
  useEffect(()=>{
    fetchFavoriteGifs();
  },[])

  return (
    <div className="mt-2">
      <span className="faded-text">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {
          favoriteGifs.map((g)=>{
            return <Gif key={g?.title} gif={g}/>
          })
        }
        
      </div>
    </div>
  )
}

export default Favorites
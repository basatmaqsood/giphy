import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifcontext";
const contentTypes = ['stickers','gifs','texts'];

const GifPages = () => {
  const {type,slug} = useParams();
  const [gif,setGif] = useState({});
  const [relatedGifs,setRelatedGifs] = useState([]);
  const {gf} = GifState();

  const fetchGif = async ()=>{
    const gifId = slug.split('-');
    const {data} = await gf.gif(gifId[gifId.length-1]);
    const {data:related} = await gf.related(gifId[gifId.length-1]);
    setGif(data);
    setRelatedGifs(related);
  }

  useEffect(()=>{
    if(!contentTypes.includes(type)){
      throw new Error('Invalid content type');
    }
    fetchGif();
  },[])

  return (
    <div>GifPages</div>
  )
}

export default GifPages
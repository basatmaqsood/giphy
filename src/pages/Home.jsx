import { useEffect } from "react";
import { GifState } from "../context/gifcontext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gf, setGif, gif, filter } = GifState();
  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 15,
      type: filter,
      rating: "g",
    });
    setGif(data);
  };
  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img src="/banner.gif" alt="banner" className="mt-2 rounded w-full" />
      {/* filter gifs */}
      <FilterGif showTrending={true} />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {
          gif.map((g)=>{
            return <Gif key={g?.title} gif={g}/>
          })
        }
        
      </div>
    </div>
  );
};

export default Home;

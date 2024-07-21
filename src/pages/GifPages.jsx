import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifcontext";
import Gif from "../components/Gif";
import {

  HiMiniHeart,
} from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";
const contentTypes = ["stickers", "gifs", "texts"];

const GifPages = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const { gf,addToFavorites,favorites } = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1]);
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentTypes.includes(type)) {
      throw new Error("Invalid content type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block ">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="whitespace-pre-line py-4 text-sm text-gray-400">
                {gif?.user?.description}
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink />
              <a
                href={gif?.source}
                target="_blank"
                rel="noreferrer"
                className="truncate"
              >
                {gif?.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            <div className="felx sm:hidden flex-row gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" onClick={() => {}}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => {addToFavorites(gif.id)}}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart size={30} className={`${favorites.includes(gif.id)?"text-red-500": ''}`} />Favorite

            </button>
            <button
              onClick={() => {}}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <FaPaperPlane size={30}  />Share

            </button>
            <button
              onClick={() => {}}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30}  />Embed

            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related Gifs</span>
        </div>
      </div>
    </div>
  );
};

export default GifPages;

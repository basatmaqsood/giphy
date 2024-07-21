import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchGifs = async () => {
    if (query.trim() === "") return;
    navigate(`/search/${query}`);
    setQuery("");
  };
  return (
    <div className="flex relative">
      <input
        type="text"
        value={query}
        placeholder="Search all GIFs and Stickers:"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchGifs();
          }
          return;
        }}
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none "
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
          }}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6 "
        >
          <HiMiniXMark size={32} />
        </button>
      )}
      <button
        className=" bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br "
        onClick={() => {
          searchGifs();
        }}
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100 " />
      </button>
    </div>
  );
};

export default GifSearch;

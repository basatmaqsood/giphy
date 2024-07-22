/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gifcontext";
import GifSearch from "./GifSearch";

const Header = () => {
  const [category, setCategory] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategory(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2 *:">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="website logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer ">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center justify-center">
          {category?.slice(0, 5)?.map((singleCategory,i) => {
            return (
              <Link
                className=" px-4 py-1 hover:gradient border-b-4 hidden lg:block "
                key={i}
                to={`/${singleCategory.name_encoded}`}
              >
                {singleCategory.name}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setShowCategories(!showCategories);
            }}
          >
            <HiEllipsisVertical
              className={`p-0.5 ${
                showCategories ? "gradient" : "hover:gradient"
              } border-b-4 hidden lg:block`}
              size={35}
            />
          </button>
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden "
              size={30}
            />
          </button>
        </div>
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {console.log(category)}
              {category?.map((singleCategory,i) => {
               return <Link to={`/${singleCategory.name_encoded}`} key={i}>{singleCategory.name}</Link>;
              })}
            </div>
          </div>
        )}
      </div>
      <GifSearch />
    </nav>
  );
};

export default Header;

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Header = () => {
  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

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
          <Link className=" px-4 py-1 hover:gradient border-b-4 hidden lg:block ">
            Reactions
          </Link>
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
          <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favorites">Favorite GIFs</Link>
          </div>
          <button>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden "
              size={30}
            />
          </button>
        </div>
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span>Categories</span>
            <hr />
            <div>
              <Link> Reactions</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifcontext";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const { gf, filter } = GifState();
  const fetchResults = async () => {
    const { data } = await gf.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 25,
    });
    setSearchResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold ">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {searchResults.map((g) => {
            return <Gif key={g?.title} gif={g} />;
          })}
        </div>
      ) : (
        <span>No results found</span>
      )}
    </div>
  );
};

export default Search;

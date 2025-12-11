import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
const Search = ({ searchterm, setsearchterm }) => {
  const placeholders = [
    "Search for an action movie...",
    "Try 'Inception'",
    "Try 'Avengers'",
    "Try 'Interstellar'",
    "Search any movie title...",
  ];

  const handleChange = (e) => {
    setsearchterm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          value={searchterm}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Search;

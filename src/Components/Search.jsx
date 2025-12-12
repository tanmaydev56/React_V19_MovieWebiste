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
    
     
<div className="mt-10">       
   <PlaceholdersAndVanishInput        
          placeholders={placeholders}
          value={searchterm}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        </div>

      
  
  );
};

export default Search;

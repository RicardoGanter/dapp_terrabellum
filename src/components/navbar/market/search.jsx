import { useState,useEffect } from "react";

const Search = ({api,title}) => {
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState(api);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredNames = api.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNames(filteredNames);
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div >
      <p >{title}</p>
      <input
        style={{backgroundColor:'lightblue'}}
        type="text"
        label={title}
        onChange={handleSearch}
        value={searchTerm}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && searchTerm.length >= 3 && (
        <div >
          {filteredNames.map((name) => (
            <div key={name}>{name}</div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Search;
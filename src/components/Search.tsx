import { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash.debounce";
const mockApi = [
  "john",
  "jos",
  "jane",
  "janet",
  "james",
  "joshua",
  "Jenet",
  "jenifa",
];
const getSearchResult = async (searchTerm: string) => {
  console.log("api request");
  await new Promise((resolv) => setTimeout(resolv, 500));

  return mockApi.filter((result) =>
    result.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())
  );
};
const Search = () => {
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debounceRequest = debounce(async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setSearchResult([]);
      return;
    }
    const results = await getSearchResult(searchTerm);
    setSearchResult(results);
  }, 500);
  const debounced = useCallback(
    (searchtem: string) => debounceRequest(searchtem),
    []
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounced(e.target.value);
  };
  return (
    <div>
      <form action="submit">
        <label htmlFor="search">Search</label>
        <input
          value={searchTerm}
          onChange={onChange}
          className="search"
          type="search"
          name=""
          id=""
          placeholder="Search..."
        />
      </form>

      <div>
        {searchResult.map((item) => (
          <div key={item} className="p-2">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

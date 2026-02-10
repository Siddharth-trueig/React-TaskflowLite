import { useState, useEffect } from "react";
import { useDebounce } from "../../../../Common/hooks/useDebounce";
import { useTask } from "../../../../Common/Context/TaskContext";

export const TaskSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { setSearchval } = useTask();

  useEffect(() => {
    setSearchval(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <div>Search By Title:</div>
      <input
        className="search inputfield2"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};


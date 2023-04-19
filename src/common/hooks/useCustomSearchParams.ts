import { useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";

export const useCustomSearchParams = () => {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};

import { useQuery } from "react-query";
import { getCharacterByName } from "../api/Api";

const useCharacterByName = (name: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", name],
    queryFn: () => getCharacterByName(name),
  });
  return { data, isLoading, isError };
};

export default useCharacterByName;

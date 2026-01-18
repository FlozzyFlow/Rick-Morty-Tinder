import { useQuery } from "react-query";
import { getCharacterByName } from "../api/Api";

const useCharacterByName = (name: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["character", name],
    queryFn: () => getCharacterByName(name),
    enabled: name.trim() !== "",
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isLoading, isError, error, refetch };
};

export default useCharacterByName;

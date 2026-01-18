import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../api/Api";

const useCharacter = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
    enabled: !!id && !isNaN(id),
    retry: 2,
    retryDelay: 1000,
  });
  return { data, isLoading, isError, error, refetch };
};

export default useCharacter;

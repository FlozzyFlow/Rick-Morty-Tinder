import { useQuery } from "react-query";
import { getCharacter } from "../api/Api";

const useCharacter = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
  });
  return { data, isLoading, isError };
};

export default useCharacter;

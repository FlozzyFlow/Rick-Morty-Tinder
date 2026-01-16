import axios from "axios";
import { useQuery } from "react-query";
import type { ICharacter } from "../types/Types";
import { getCharacters } from "../api/Api";


const useCharacters = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });
  return {data, isLoading, isError}
};

export default useCharacters
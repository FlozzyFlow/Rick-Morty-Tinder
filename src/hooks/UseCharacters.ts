import axios from "axios";
import { useQuery } from "react-query";
import type { ICharacter } from "../types/Types";

const getCharacters = async (): Promise<ICharacter[]> => {
  try {
    const res = await axios.get<{ results: ICharacter[] }>(
      "https://rickandmortyapi.com/api/character"
    );

    // В axios данные лежат в res.data.
    // У Рика и Морти массив персонажей лежит в res.data.results
    if (!res.data || !res.data.results) {
      throw new Error("no data");
    }

    return res.data.results;
  } catch (e) {
    console.error(e);
    // Пробрасываем ошибку, чтобы Promise стал rejected
    throw e;
  }
};
const useCharacters = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });
  return {data, isLoading, isError}
};

export default useCharacters
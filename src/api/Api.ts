import axios from "axios";
import type { ICharacter } from "../types/Types";

export const getCharacters = async (): Promise<ICharacter[]> => {
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
export const getCharacter = async (id: number): Promise<ICharacter> => {
  try {
    const res = await axios.get<ICharacter>(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    // В axios данные лежат в res.data.
    // У Рика и Морти массив персонажей лежит в res.data.results
    if (!res.data) {
      throw new Error("no data");
    }

    return res.data;
  } catch (e) {
    console.error(e);
    // Пробрасываем ошибку, чтобы Promise стал rejected
    throw e;
  }
};

import axios from "axios";
import type { ICharacter } from "../types/Types";

export const getCharacterByName = async (
  name: string
): Promise<ICharacter[]> => {
  try {
    const res = await axios.get<{ results: ICharacter[] }>(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );

    // В axios данные лежат в res.data.
    // У Рика и Морти массив персонажей лежит в res.data.results
    if (!res.data) {
      return [];
    }

    // Если results отсутствует или пустой массив, возвращаем пустой массив
    return res.data.results || [];
  } catch (e: any) {
    // Если это ошибка 404 (персонаж не найден), возвращаем пустой массив
    if (e.response?.status === 404) {
      return [];
    }
    
    console.error(e);
    // Для других ошибок пробрасываем ошибку
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

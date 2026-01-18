import useCharacters from "../hooks/useCharacterByName";
import CharacterInfo from "../components/CharacterInfo";
import s from "./Home.module.scss";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import useCharacter from "../hooks/useCharacter";
import { Link } from "react-router-dom";
import { useSearchStore } from "../store/Store";
import React from "react";
import useCharacterByName from "../hooks/useCharacterByName";
const Home = () => {
  const [id, setId] = useState<number>(() => {
    const savedId = localStorage.getItem("id");
    const parsed = Number(savedId);
    return savedId && !isNaN(parsed) ? parsed : 1;
  });

  const { searchQuery, setSearchQuery } = useSearchStore();

  // 1. Переименовываем data в charData и searchData
  // Также переименовываем isLoading, чтобы не путаться
  const {
    data: charData,
    isLoading: isCharLoading,
    isError: isCharError,
  } = useCharacter(id);

  const { data: searchData, isLoading: isSearchLoading } =
    useCharacterByName(searchQuery);

  useEffect(() => {
    localStorage.setItem("id", String(id));
  }, [id]);

  if (isCharError) return <h1>Error loading character</h1>;

  return (
    <div className={s.bg}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input className={s.search}
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          // ИСПРАВЛЕНО: нужно брать e.target.value
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className={s.content}>
        {/* ЛОГИКА ОТОБРАЖЕНИЯ */}
        {searchQuery.trim() !== "" ? (
          // ЕСЛИ ЕСТЬ ПОИСКОВЫЙ ЗАПРОС
          isSearchLoading ? (
            <Skeleton />
          ) : (
            <div className={s.searchList}>
              {/* Поиск обычно возвращает массив, поэтому делаем map */}
              {searchData?.map((c) => (
                <CharacterInfo key={c.id} character={c} />
              ))}
            </div>
          )
        ) : // ЕСЛИ ПОИСКА НЕТ — ПОКАЗЫВАЕМ ПЕРСОНАЖА ПО ID
        isCharLoading || !charData ? (
          <Skeleton />
        ) : (
          <CharacterInfo character={charData} />
        )}
      </div>

      {/* Кнопки пагинации показываем только когда нет поиска */}
      {!searchQuery && (
        <div className={s.buttons}>
          <button onClick={() => setId((p) => Math.max(1, p - 1))}>Prev</button>
          <button onClick={() => setId((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Home;

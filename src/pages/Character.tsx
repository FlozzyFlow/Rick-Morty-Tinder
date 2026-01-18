import React from "react";
import s from "./Home.module.scss";

import { useParams } from "react-router-dom";
import useCharacter from "../hooks/useCharacter";
import CharacterInfo from "../components/CharacterInfo";
import Skeleton from "../components/Skeleton";

const Character = () => {
  const { id } = useParams();
  const characterId = Number(id);

  // Если id нет или это не число, не вызываем хук или выводим ошибку раньше
  if (!id || isNaN(characterId)) return <h1>Invalid ID</h1>;

  const { data, isError, isLoading } = useCharacter(characterId);
  if (isLoading) return <Skeleton />
  if (isError) return <h1>errror</h1>;
  if (!data) throw new Error("no data");

  return (
    <div className={s.bg}>
      <div className={s.content}>
        <CharacterInfo character={data} isFull={true} />
      </div>
    </div>)
};

export default Character;

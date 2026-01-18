import React from "react";
import s from "./Character.module.scss";
import { useParams, Link } from "react-router-dom";
import useCharacter from "../hooks/useCharacter";
import CharacterInfo from "../components/CharacterInfo";
import Skeleton from "../components/Skeleton";
import ErrorMessage from "../components/ErrorMessage";

const Character = () => {
  const { id } = useParams();
  const characterId = Number(id);

  // Если id нет или это не число, показываем ошибку
  if (!id || isNaN(characterId)) {
    return (
      <div className={s.bg}>
        <div className={s.content}>
          <ErrorMessage
            title="Invalid Character ID"
            message="The character ID is invalid or missing. Please check the URL and try again."
            linkTo="/"
            linkText="Go Back to Home"
          />
        </div>
      </div>
    );
  }

  const { data, isError, isLoading, refetch } = useCharacter(characterId);

  if (isLoading) {
    return (
      <div className={s.bg}>
        <div className={s.content}>
          <Skeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={s.bg}>
        <div className={s.content}>
          <ErrorMessage
            title="Error Loading Character"
            message="Failed to load character information. The character might not exist or there's a connection problem."
            onRetry={() => refetch()}
            linkTo="/"
            linkText="Go Back to Home"
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={s.bg}>
        <div className={s.content}>
          <ErrorMessage
            title="Character Not Found"
            message="The character you're looking for doesn't exist in the database. Please check the ID and try again."
            onRetry={() => refetch()}
            linkTo="/"
            linkText="Go Back to Home"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={s.bg}>
      <div className={s.content}>
        <CharacterInfo character={data} isFull={true} />
      </div>
    </div>
  );
};

export default Character;

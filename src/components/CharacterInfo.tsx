import React from "react";
import type { ICharacter } from "../types/Types";

interface Props {
  character: ICharacter;
}
const CharacterInfo = ({ character }: Props) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image}></img>
      <p>{character.gender}</p>
      <p>{character.status}</p>
      <p>{character.species}</p>
    </div>
  );
};

export default CharacterInfo;

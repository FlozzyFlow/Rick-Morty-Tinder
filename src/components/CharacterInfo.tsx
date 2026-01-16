import { Link } from "react-router-dom";
import type { ICharacter } from "../types/Types";

interface Props {
  character: ICharacter;
}
const CharacterInfo = ({ character }: Props) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image}></img>
      <Link to={`/characters/${character.id}`}>About</Link>
    </div>
  );
};

export default CharacterInfo;

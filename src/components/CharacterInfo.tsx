import { Link } from "react-router-dom";
import type { ICharacter } from "../types/Types";
import { motion } from "framer-motion";
import s from "./CharacterInfo.module.scss";

interface Props {
  character: ICharacter;
  isFull?: boolean
}

const CharacterInfo = ({ character, isFull }: Props) => {
  return (
    <motion.div
      className={s.characterCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isFull ? (<>
        <img className={s.image} src={character.image} alt={character.name} />
        <h2 className={s.name}>{character.name}</h2>
        <div>
          <div className={s.info}>
            <p className={s.text}>gender</p>
            <p className={s.text}>species</p>
            <p className={s.text}>status</p>
          </div>
          <div className={s.info}>
            <p className={s.text}>{character.gender}</p>
            <p className={s.text}>{character.species}</p>
            <p className={s.text}>{character.status}</p>
          </div>
        </div>

        <Link className={s.link} to={`/`}>
          Back
        </Link>
      </>) : (<>

        <img className={s.image} src={character.image} alt={character.name} />
        <h2 className={s.name}>{character.name}</h2>
        <Link className={s.link} to={`/characters/${character.id}`}>
          About
        </Link></>)}

    </motion.div>
  );
};
export default CharacterInfo;

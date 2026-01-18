import { Link } from "react-router-dom";
import type { ICharacter } from "../types/Types";
import { motion } from "framer-motion";
import s from "./CharacterInfo.module.scss";

interface Props {
  character: ICharacter;
  isFull?: boolean;
  index?: number;
}

const CharacterInfo = ({ character, isFull, index = 0 }: Props) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateY: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.02,
      rotateY: 2,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      className={s.characterCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {isFull ? (
        <>
          <motion.img
            className={s.image}
            src={character.image}
            alt={character.name}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.h2
            className={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {character.name}
          </motion.h2>
          <motion.div
            className={s.infoContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.div
              className={s.infoRow}
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <span className={s.label}>Gender:</span>
              <span className={s.value}>{character.gender}</span>
            </motion.div>
            <motion.div
              className={s.infoRow}
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <span className={s.label}>Species:</span>
              <span className={s.value}>{character.species}</span>
            </motion.div>
            <motion.div
              className={s.infoRow}
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <span className={s.label}>Status:</span>
              <span className={`${s.value} ${s.status} ${s[character.status.toLowerCase()] || ''}`}>
                {character.status}
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Link className={s.link} to={`/`}>
              Back
            </Link>
          </motion.div>
        </>
      ) : (
        <>
          <motion.img
            className={s.image}
            src={character.image}
            alt={character.name}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.h2
            className={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {character.name}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Link className={s.link} to={`/characters/${character.id}`}>
              About
            </Link>
          </motion.div>
        </>
      )}

    </motion.div>
  );
};
export default CharacterInfo;

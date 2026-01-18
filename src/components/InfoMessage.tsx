import { motion } from "framer-motion";
import s from "./InfoMessage.module.scss";

interface InfoMessageProps {
  title: string;
  message: string;
}

const InfoMessage = ({ title, message }: InfoMessageProps) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        type: "spring" as const,
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={s.infoContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={s.icon}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
      >
        🔍
      </motion.div>
      <h1 className={s.title}>{title}</h1>
      <p className={s.message}>{message}</p>
    </motion.div>
  );
};

export default InfoMessage;

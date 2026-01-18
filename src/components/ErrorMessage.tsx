import { motion } from "framer-motion";
import s from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  linkTo?: string;
  linkText?: string;
}

const ErrorMessage = ({
  title,
  message,
  onRetry,
  linkTo,
  linkText
}: ErrorMessageProps) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
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
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={s.errorContainer}
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
        ⚠️
      </motion.div>
      <h1 className={s.title}>{title}</h1>
      <p className={s.message}>{message}</p>

      <div className={s.actions}>
        {onRetry && (
          <motion.button
            className={s.retryButton}
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Retry
          </motion.button>
        )}

        {linkTo && (
          <motion.a
            href={linkTo}
            className={s.link}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {linkText || "Go Back"}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;

import CharacterInfo from "../components/CharacterInfo";
import s from "./Home.module.scss";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import useCharacter from "../hooks/useCharacter";
import { useSearchStore } from "../store/Store";
import useCharacterByName from "../hooks/useCharacterByName";
import { motion, AnimatePresence } from "framer-motion";
import ErrorMessage from "../components/ErrorMessage";
import InfoMessage from "../components/InfoMessage";
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
    refetch: refetchCharacter,
  } = useCharacter(id);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useCharacterByName(searchQuery);

  useEffect(() => {
    localStorage.setItem("id", String(id));
  }, [id]);

  if (isCharError) {
    return (
      <div className={s.bg}>
        <div className={s.content}>
          <ErrorMessage
            title="Error Loading Character"
            message="Failed to load character information. Please check your internet connection and try again."
            onRetry={() => refetchCharacter()}
          />
        </div>
      </div>
    );
  }

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

      {searchQuery.trim() !== "" ? (
        isSearchLoading ? (
          <div className={s.content}>
            <Skeleton />
          </div>
        ) : isSearchError ? (
          <div className={s.content}>
            <ErrorMessage
              title="Search Error"
              message="Failed to search characters. Please check your internet connection and try again."
              onRetry={() => refetchSearch()}
            />
          </div>
        ) : searchData && searchData.length > 0 ? (
          <motion.div
            className={s.searchList}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {searchData.map((c, index) => (
              <CharacterInfo key={c.id} character={c} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className={s.content}>
            <InfoMessage
              title="Персонаж не найден"
              message={`Персонаж с именем "${searchQuery}" не найден. Попробуйте поискать с другим именем или проверьте написание.`}
            />
          </div>
        )
      ) : (
        <div className={s.content}>
          {isCharLoading || !charData ? (
            <Skeleton />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const threshold = 50;
                  const velocity = info.velocity.x;

                  // Swipe left (влево, отрицательное offset) - следующий персонаж
                  if (info.offset.x < -threshold || velocity < -500) {
                    setId((p) => p + 1);
                  }
                  // Swipe right (вправо, положительное offset) - предыдущий персонаж
                  else if (info.offset.x > threshold || velocity > 500) {
                    setId((p) => Math.max(1, p - 1));
                  }
                }}
                style={{ cursor: "grab" }}
                whileDrag={{ cursor: "grabbing", scale: 0.98 }}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.4
                }}
              >
                <CharacterInfo character={charData} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* Кнопки пагинации показываем только когда нет поиска */}
      {!searchQuery && (
        <div className={s.buttons}>
          <button
            onClick={() => setId((p) => Math.max(1, p - 1))}
            disabled={id <= 1}
          >
            Prev
          </button>
          <button onClick={() => setId((p) => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Home;

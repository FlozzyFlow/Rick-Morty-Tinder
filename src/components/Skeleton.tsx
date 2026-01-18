import s from "./Skeleton.module.scss";

const Skeleton = () => {
  return (
    <div className={s.skeletonCard}>
      <div className={s.image} />
      <div className={s.line} />
      <div className={s.lineShort} />
      <div className={s.line} style={{ width: "70%" }} />
    </div>
  );
};

export default Skeleton;

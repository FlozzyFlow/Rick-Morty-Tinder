import useCharacters from "../hooks/useCharacters";
import CharacterInfo from "../components/CharacterInfo";

const Home = () => {
  const { data, isError, isLoading } = useCharacters();

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>errror</h1>;
  if (!data) throw new Error("no data");

  return (
    <div>
      {data.map((c) => (
        <CharacterInfo key={c.id} character={c} />
      ))}
    </div>
  );
};

export default Home;

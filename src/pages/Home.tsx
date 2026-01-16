import React from "react";
import axios from "axios";
import type { ICharacter } from "../types/Types";
import { useQuery } from "react-query";
import useCharacters from "../hooks/UseCharacters";
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

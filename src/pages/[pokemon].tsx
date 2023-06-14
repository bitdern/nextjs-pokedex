import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonAPI from "@/network/pokemon-api";
import Head from "next/head";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    PokemonAPI.getPokemon
  );

  return (
    <>
      <Head></Head>
    </>
  );
}

import useSWR from "swr";
import * as PokemonAPI from "@/network/pokemon-api";
import { AxiosError } from "axios";

export default function usePokemon(name: string) {
  const { data, isLoading, mutate } = useSWR(name, async () => {
    try {
      return await PokemonAPI.getPokemon(name);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      } else {
        throw error;
      }
    }
  });

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    mutatePokemon: mutate,
  };
}

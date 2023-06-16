import usePokemon from "@/hooks/usePokemon";
import Link from "next/link";

export default function PokemonEntry({ name }: { name: string }) {
  const { pokemon, pokemonLoading } = usePokemon(name);

  return (
    <Link href={"/" + name}>
      <div></div>
    </Link>
  );
}

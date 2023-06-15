import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonAPI from "@/network/pokemon-api";
import Head from "next/head";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    PokemonAPI.getPokemon
  );

  return (
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name} - NextJS Pokedex`}</title>}
      </Head>

      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            ← PokeDex
          </Link>
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + pokemon.name}
              width={400}
              height={400}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

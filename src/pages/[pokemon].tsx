import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "@/hooks/usePokemon";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading } = usePokemon(pokemonName);

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
        {pokemon === null && <p>Pokemon not found</p>}
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
              <div>
                <strong>Height:</strong> {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
            </div>
            <Form className="mt-4">
              <Form.Group controlId="pokemon-nickname-input" className="mb-3">
                <Form.Label>Give this Pokemon a Nickname</Form.Label>
                <Form.Control name="nickname" placeholder="Timmy Turn Up" />
              </Form.Group>
            </Form>
          </>
        )}
      </div>
    </>
  );
}

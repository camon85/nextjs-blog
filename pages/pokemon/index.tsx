import Head from "next/head";
import Link from "next/Link";
import Layout from "../../components/layout";

export default function Home({ pokemon }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Pokedex</title>
      </Head>
      <h1>The Nextjs Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon/${index + 1}`}>
              <a>
                <img src={pokeman.image} alt={pokeman.name} />
                <span>{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}

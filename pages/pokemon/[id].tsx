import Head from "next/head";
import React from "react";
import Layout from "../../components/layout";
import Link from "next/Link";

export default function pokemon({ pokeman }) {
  return (
    <Layout>
      <Head>
        <title>{pokeman.name}</title>
      </Head>
      <h1>
        {pokeman.id}. {pokeman.name}
      </h1>
      <img src={pokeman.image} alt={pokeman.name} />
      <p>
        <span>Weight:</span> {pokeman.weight}
      </p>
      <p>
        <span>Height:</span>
        {pokeman.height}
      </p>
      <h2>Types</h2>
      {pokeman.types.map((type, index) => (
        <p key="index">{type.type.name}</p>
      ))}
      <p>
        <Link href="/pokemon">
          <a>List</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ("00" + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}

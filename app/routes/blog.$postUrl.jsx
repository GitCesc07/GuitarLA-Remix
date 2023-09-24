import { useLoaderData } from "@remix-run/react";
import { getPost } from "../models/posts.server";
import {formatearFecha} from "../utils/helpers"

export function meta({ data }) {
  if (!data) {
    return [
      { title: "GuitarLA - Entrada no encontrada" },
      {
        description: `Guitarras, Ventas de Guitarras, entrada no encontrada`,
      },
    ];
  }

  return [
    { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
    {
      description: `Guitarras, Ventas de Guitarras, entrada ${data.data[0].attributes.titulo}`,
    },
  ];
}

export async function loader({ params }) {
  const { postUrl } = params
  const post = await getPost(postUrl);

  // Validamos que el post que se esta buscando exista, si no existe enviamos un error
  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El post que esta buscando, no se encontro...",
    });
  }

  return post
}


function Post() {
  const post = useLoaderData();
  const { contenido, imagen, titulo, publishedAt } =
    post?.data[0]?.attributes

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen?.data?.attributes?.url}
        alt={`Imagen - ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}

export default Post;

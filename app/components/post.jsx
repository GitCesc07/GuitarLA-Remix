import { Link } from "@remix-run/react"
import {formatearFecha} from "../utils/helpers"

function Post({post}) {

    const {contenido, imagen, titulo, url, publishedAt} = post

  return (
    <article className="post">
      <img
        className="imagen"
        src={imagen.data.attributes.formats.small.url}
        alt={`Imagen - ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link className="enlace" to={`/blog/${url}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-book"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            // stroke="#ffec00"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
            <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
            <path d="M3 6l0 13" />
            <path d="M12 6l0 13" />
            <path d="M21 6l0 13" />
          </svg>
          Leer Post
        </Link>
      </div>
    </article>
  );
}

export default Post

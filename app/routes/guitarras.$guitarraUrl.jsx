import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "../models/guitarras.server";
import Swal from "sweetalert2";

export function meta({ data }) {
  if (!data) {
    return [
      { title: "GuitarLA - Guitarra no encontrada" },
      {
        description: `Guitarras, Ventas de Guitarras, Guitarra no encontrada`,
      },
    ];
  }

  return [
    { title: `GuitarLA - ${data.data[0].attributes.nombre}` },
    {
      description: `Guitarras, Ventas de Guitarras, Guitarra ${data.data[0].attributes.nombre}`,
    },
  ];
}

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  // Si no existe ninguna guitarra con ese nombre, mandamos el error
  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "La guitarra que buscas, no se ha encontrado...",
    });
  }

  return guitarra;
}

function Guitarra() {
  const { agregarCarrito } = useOutletContext();

  const [cantidad, setCantidad] = useState(0);

  const guitarra = useLoaderData();

  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      Swal.fire({
        title: "GuitarLA",
        text: "Debes de seleccionar una cantidad",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#e99401",
      });

      return;
    }

    Swal.fire({
      title: "GuitarLA",
      text: "¿Seguro desea agregar al carrito de compra?",
      icon: "question",
      confirmButtonText: "Si, agregar",
      confirmButtonColor: "#e99401",
      showCancelButton: true,
      cancelButtonColor: "#ff0303",
      cancelButtonText: "No, agregar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "GuitarLA",
          text: "La guitarra se agrego correctamente al carrito de compra",
          icon: "success",
          confirmButtonColor: "#e99401",
          confirmButtonText: "Ok",
        });

        const guitarraSeleccionada = {
          id: guitarra.data[0].id,
          imagen: imagen.data.attributes.url,
          nombre,
          precio,
          cantidad,
        };

        agregarCarrito(guitarraSeleccionada);
      }
    });
  };

  return (
    <div className="guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen Guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario" action="">
          <label htmlFor="select">Cantidad</label>
          <select
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            id="select"
          >
            <option value="0">-- Seleccione la cantidad --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
}

export default Guitarra;

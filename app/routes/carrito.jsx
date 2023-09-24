import { useEffect, useState } from "react";
import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import styles from "../styles/carrito.css";

export function meta() {
  return [
    { title: "GuitarLA - Carrito de Compras" },
    {
      description:
        "Venta de Guitarras, Música, Blog, carrito de compras, tienda",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

function Carrito() {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );

    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={"Cargando..."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0
                ? "Carrito Vacío"
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen Guitarra ${producto.nombre}`}
                        />
                      </div>

                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>Cantidad:</p>

                        <select
                          className="select"
                          value={producto.cantidad}
                          onChange={(e) =>
                            actualizarCantidad({
                              cantidad: +e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                        <p className="precio">
                          $ <span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: $
                          <span>{producto.cantidad * producto.precio}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn-Eliminar"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-trash-x"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#ff2825"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7h16" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          <path d="M10 12l4 4m0 -4l-4 4" />
                        </svg>
                      </button>
                    </div>
                  ))}
            </div>

            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;

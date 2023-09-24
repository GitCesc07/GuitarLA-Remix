import imagen from "../../public/img/nosotros.jpg";
import style from "~/styles/nosotros.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: style
    },
    {
      rel: "preload",
      href: imagen,
      as: "image"
    }
  ]
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="Imagen Sobre Nosotros" />

        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos placeat neque nulla voluptatibus architecto, delectus sequi vel saepe dolore in similique quis fugit eaque ipsam itaque explicabo maxime! Commodi, quaerat! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aliquam id aspernatur ea doloribus quia quae pariatur possimus placeat provident explicabo magni rem sequi, excepturi fuga sit, nam voluptatum quos?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas iusto tenetur dignissimos enim ratione. Perferendis doloremque officia architecto sequi laudantium facere, voluptatum modi maiores quaerat in repudiandae numquam reiciendis?
          </p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros

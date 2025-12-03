// Script para cargar productos de librería en MockAPI
const API_URL = "https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos";

const productosLibreria = [
  { nombre: "Anotador Cartera", precio: 1200, descripcion: "Anotador compacto estilo cartera.", imagen: "anotadorcartera.jpg" },
  { nombre: "Anotador París", precio: 1300, descripcion: "Anotador con diseño de París.", imagen: "anotadorparis.jpg" },
  { nombre: "Cartuchos Fibron", precio: 800, descripcion: "Set de cartuchos para fibrones.", imagen: "cartuchosfibron.jpg" },
  { nombre: "Clips Kawaii", precio: 500, descripcion: "Clips decorativos estilo kawaii.", imagen: "clipskawaii.jpg" },
  { nombre: "Cuaderno A5 - Modelo 1", precio: 1500, descripcion: "Cuaderno A5 rayado.", imagen: "cuadernoa5-1.jpg" },
  { nombre: "Cuaderno A5 - Modelo 2", precio: 1500, descripcion: "Cuaderno A5 cuadriculado.", imagen: "cuadernoa5-2.jpg" },
  { nombre: "Cuaderno A5", precio: 1500, descripcion: "Cuaderno A5 clásico.", imagen: "cuadernoa5.jpg" },
  { nombre: "Cuadernos Pastel", precio: 1600, descripcion: "Set de cuadernos en tonos pastel.", imagen: "cuadernospastel.jpg" },
  { nombre: "Espejito 1", precio: 700, descripcion: "Espejito portátil decorado.", imagen: "espejito1.jpg" },
  { nombre: "Fibron Pizarra", precio: 400, descripcion: "Fibron para pizarra blanca.", imagen: "fibronpizarra.jpg" }, // ⚠️ corregí extensión
  { nombre: "Flexibles", precio: 600, descripcion: "Reglas flexibles de colores.", imagen: "flexibles.jpg" },
  { nombre: "Goma Pikachu", precio: 350, descripcion: "Goma de borrar con diseño Pikachu.", imagen: "gomapikachu.jpg" },
  { nombre: "Gomas Dinosaurios", precio: 350, descripcion: "Set de gomas con forma de dinosaurios.", imagen: "gomasdinos.jpg" },
  { nombre: "Gomas Patitas", precio: 350, descripcion: "Set de gomas con forma de huellas.", imagen: "gomaspatitas.jpg" },
  { nombre: "Lapicera Azul", precio: 250, descripcion: "Lapicera tinta azul.", imagen: "lapicera.jpg" },
  { nombre: "Lapicera 1", precio: 250, descripcion: "Lapicera modelo 1.", imagen: "lapicera1.jpg" },
  { nombre: "Lapicera 2", precio: 250, descripcion: "Lapicera modelo 2.", imagen: "lapicera2.jpg" }, // ⚠️ corregí nombre
  { nombre: "Lapicera 3", precio: 250, descripcion: "Lapicera modelo 3.", imagen: "lapicera3.jpg" },
  { nombre: "Lapicera 4", precio: 250, descripcion: "Lapicera modelo 4.", imagen: "lapicera4.jpg" },
  { nombre: "Lapicera 5", precio: 250, descripcion: "Lapicera modelo 5.", imagen: "lapicera5.jpg" },
  { nombre: "Lapicera 6", precio: 250, descripcion: "Lapicera modelo 6.", imagen: "lapicera6.jpg" },
  { nombre: "Lapicera Gel", precio: 300, descripcion: "Lapicera de tinta gel.", imagen: "lapiceragel.jpg" },
  { nombre: "Lapicera Mini Conejo", precio: 300, descripcion: "Lapicera decorada con conejo.", imagen: "lapiceraminiconejo.jpg" },
  { nombre: "Lapicera Negra", precio: 250, descripcion: "Lapicera tinta negra.", imagen: "lapiceranegra.jpg" },
  { nombre: "Lapicera Panda", precio: 300, descripcion: "Lapicera decorada con panda.", imagen: "lapicerapanda.jpg" },
  { nombre: "Lapicera Pikachu", precio: 300, descripcion: "Lapicera decorada con Pikachu.", imagen: "lapicerapikachu.jpg" },
  { nombre: "Libreta Dino", precio: 1200, descripcion: "Libreta con diseño de dinosaurio.", imagen: "libretadino.jpg" },
  { nombre: "Libreta Juegos", precio: 1200, descripcion: "Libreta con motivos de juegos.", imagen: "libretajuegos.jpg" },
  { nombre: "Libretita 1", precio: 1000, descripcion: "Libretita pequeña modelo 1.", imagen: "libretita1.jpg" },
  { nombre: "Maped Colores", precio: 2000, descripcion: "Set de lápices de colores Maped.", imagen: "mapedcolores.jpg" },
  { nombre: "Microfibras Motivos", precio: 1800, descripcion: "Set de microfibras con motivos.", imagen: "microfibrasmotivos.jpg" },
  { nombre: "Notas Transparentes", precio: 900, descripcion: "Notas adhesivas transparentes.", imagen: "notastransparentes.jpg" },
  { nombre: "Resaltadores 1", precio: 1200, descripcion: "Set de resaltadores colores pastel.", imagen: "resaltadores1.jpg" },
  { nombre: "Sellitos", precio: 800, descripcion: "Set de sellitos decorativos.", imagen: "sellitos.jpg" },
  { nombre: "Set Sello", precio: 900, descripcion: "Set de sellos variados.", imagen: "setsello.jpg" },
  { nombre: "Espejito 2", precio: 700, descripcion: "Espejito portátil decorado.", imagen: "espejito2.jpg" }, // ⚠️ corregí nombre
  { nombre: "Stickers 1", precio: 500, descripcion: "Set de stickers decorativos.", imagen: "stickers.jpg" },
  { nombre: "Stickers 2", precio: 500, descripcion: "Set de stickers decorativos.", imagen: "stickers2.jpg" },
  { nombre: "Stickers 3", precio: 500, descripcion: "Set de stickers decorativos.", imagen: "stickers3.jpg" },
  { nombre: "Stickers 4", precio: 500, descripcion: "Set de stickers decorativos.", imagen: "stickers4.jpg" },
];

// Función para cargar productos en MockAPI
export async function seedProductos() {
  for (const producto of productosLibreria) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const data = await res.json();
      console.log("✅ Producto creado:", data);
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
    }
  }
}

// Script para cargar productos de librería en MockAPI
const API_URL = "https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos";

const productosLibreria = [
  {
    nombre: "Cuaderno A4 Rayado",
    precio: 1200,
    descripcion: "Cuaderno de tapa dura, 80 hojas rayadas.",
    imagen: "https://via.placeholder.com/150"
  },
  {
    nombre: "Lapicera Azul Bic",
    precio: 250,
    descripcion: "Lapicera de tinta azul, punta fina.",
    imagen: "https://via.placeholder.com/150"
  },
  {
    nombre: "Resaltadores Pastel",
    precio: 1800,
    descripcion: "Set de 6 resaltadores colores pastel.",
    imagen: "https://via.placeholder.com/150"
  },
  {
    nombre: "Carpeta Escolar Nº3",
    precio: 950,
    descripcion: "Carpeta plástica con anillos metálicos.",
    imagen: "https://via.placeholder.com/150"
  },
  {
    nombre: "Regla 30cm Transparente",
    precio: 400,
    descripcion: "Regla plástica transparente de 30 cm.",
    imagen: "https://via.placeholder.com/150"
  },
  {
    nombre: "Marcadores Permanentes",
    precio: 2200,
    descripcion: "Set de 4 marcadores permanentes de colores.",
    imagen: "https://via.placeholder.com/150"
  }
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
      console.log("Producto creado:", data);
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  }
}

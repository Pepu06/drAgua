import PocketBase from "pocketbase";

const pb = new PocketBase("https://allforwater.pockethost.io");

let items = [];

try {
  await pb.admins.authWithPassword("pedro@gmail.com", "Pedro12345");

  const records = await pb.collection("categorias_es").getList(0, 100);
  items = records.items.map((item) => {
    const collectionId = "categorias_es"; // ID de la colección
    const recordId = item.id; // ID del registro actual
    const firstFilename = item.foto;

    // Construimos la URL manualmente
    const imageUrl = firstFilename
      ? `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${firstFilename}`
      : "/path-to-placeholder-image.png"; // Placeholder en caso de que no haya imagen

    return {
      ...item,
      imgSrc: imageUrl, // Agregamos la URL de la imagen al objeto item
      nombre: item.nombre.toUpperCase(), // Convertir el nombre a mayúsculas
    };
  });
} catch (error) {
  console.error("Error al autenticarse o al obtener el registro:", error);
}

export { items };

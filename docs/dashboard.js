const API = "https://act-4-eta.vercel.app";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// Obtener productos al cargar
async function cargarProductos() {
  try {
    const res = await fetch(API + "/api/products", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();
    mostrarProductos(data);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <strong>${p.name}</strong><br>
      Precio: $${p.price}<br>
      ${p.description}<br>
      <button onclick="eliminarProducto('${p._id}')">Eliminar</button>
    `;

    contenedor.appendChild(div);
  });
}

// Agregar producto
async function agregarProducto() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  try {
    const res = await fetch(API + "/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ name, price, description })
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Error al crear producto");
      return;
    }

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";

    cargarProductos();
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  try {
    await fetch(API + "/api/products/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    cargarProductos();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

cargarProductos();
"// prueba" 

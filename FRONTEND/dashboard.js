const API = "https://TU_URL_DE_VERCEL";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

async function loadProducts() {
  const res = await fetch(API + "/api/products", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} - $${p.price}`;
    list.appendChild(li);
  });
}

async function addProduct() {
  await fetch(API + "/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      name: name.value,
      price: price.value,
      description: desc.value
    })
  });

  loadProducts();
}

loadProducts();

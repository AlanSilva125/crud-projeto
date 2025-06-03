// api.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("apiContainer");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Erro ao buscar API");

    const usuarios = await response.json();

    usuarios.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <strong>Nome:</strong> ${user.name}<br>
        <strong>E-mail:</strong> ${user.email}<br>
        <button onclick="mostrarDetalhes(${user.id})">Ver detalhes</button>
        <div id="detalhes-${user.id}" style="display:none; margin-top:0.5rem;"></div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Erro ao carregar dados da API.</p>`;
  }
});

async function mostrarDetalhes(userId) {
  const detalhesDiv = document.getElementById(`detalhes-${userId}`);

  if (detalhesDiv.style.display === "block") {
    detalhesDiv.style.display = "none";
    detalhesDiv.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error("Erro ao buscar detalhes");

    const user = await response.json();

    detalhesDiv.innerHTML = `
      <strong>Telefone:</strong> ${user.phone}<br>
      <strong>Website:</strong> ${user.website}<br>
      <strong>Endereço:</strong> ${user.address.street}, ${user.address.city}
    `;
    detalhesDiv.style.display = "block";
  } catch (error) {
    detalhesDiv.innerHTML = `<p>Erro ao carregar detalhes.</p>`;
  }
}

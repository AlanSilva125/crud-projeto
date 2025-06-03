// perfil.js
const form = document.getElementById("perfilForm");
const usuarioEditando = JSON.parse(localStorage.getItem("usuarioEditando"));
const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

if (usuarioEditando) {
  document.getElementById("nome").value = usuarioEditando.nome;
  document.getElementById("email").value = usuarioEditando.email;
  document.getElementById("senha").value = usuarioEditando.senha;
  document.getElementById("cpf").value = usuarioEditando.cpf;
  document.getElementById("nascimento").value = usuarioEditando.nascimento;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const novo = {
      nome: document.getElementById("nome").value,
      email: usuarioEditando.email,
      senha: document.getElementById("senha").value,
      cpf: document.getElementById("cpf").value,
      nascimento: document.getElementById("nascimento").value,
      dataRegistro: usuarioEditando.dataRegistro
    };

    usuarios[usuarioEditando.index] = novo;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.removeItem("usuarioEditando");
    alert("Perfil atualizado!");
    window.location.href = "lista.html";
  });
} else {
  const logado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!logado) {
    alert("Você precisa estar logado!");
    window.location.href = "index.html";
  } else {
    document.getElementById("nome").value = logado.nome;
    document.getElementById("email").value = logado.email;
    document.getElementById("senha").value = logado.senha;
    document.getElementById("cpf").value = logado.cpf;
    document.getElementById("nascimento").value = logado.nascimento;

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const index = usuarios.findIndex(u => u.email === logado.email);
      const novo = {
        nome: document.getElementById("nome").value,
        email: logado.email,
        senha: document.getElementById("senha").value,
        cpf: document.getElementById("cpf").value,
        nascimento: document.getElementById("nascimento").value,
        dataRegistro: logado.dataRegistro
      };
      usuarios[index] = novo;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioLogado", JSON.stringify(novo));
      alert("Perfil atualizado!");
    });
  }
}

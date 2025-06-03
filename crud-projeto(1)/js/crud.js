// crud.js
function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function buscarUsuarioPorEmail(email) {
  return obterUsuarios().find(u => u.email === email);
}

// Cadastro
if (document.getElementById("cadastroForm")) {
  document.getElementById("cadastroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const nascimento = document.getElementById("nascimento").value;

    const usuarios = obterUsuarios();

    if (usuarios.some(u => u.email === email)) {
      document.getElementById("mensagemCadastro").innerText = "Usuário já cadastrado.";
      return;
    }

    const novoUsuario = {
      nome, email, senha, cpf, nascimento,
      dataRegistro: new Date().toLocaleDateString()
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const usuario = buscarUsuarioPorEmail(email);

    if (!usuario || usuario.senha !== senha) {
      document.getElementById("mensagemLogin").innerText = "E-mail ou senha inválidos.";
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "lista.html";
  });
}

// Listagem
if (document.getElementById("tabelaUsuarios")) {
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  const filtro = document.getElementById("filtro");
  const usuarios = obterUsuarios();

  function renderTabela(filtroNome = "") {
    tbody.innerHTML = "";
    usuarios
      .filter(u => u.nome.toLowerCase().includes(filtroNome.toLowerCase()))
      .forEach((u, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${u.nome}</td>
          <td>${u.email}</td>
          <td>${u.cpf}</td>
          <td>${u.nascimento}</td>
          <td>${u.dataRegistro}</td>
          <td>
            <button onclick="editarUsuario(${index})">Editar</button>
            <button onclick="excluirUsuario(${index})">Excluir</button>
          </td>
        `;
        tbody.appendChild(row);
      });
  }

  filtro.addEventListener("input", () => renderTabela(filtro.value));

  renderTabela();

  window.excluirUsuario = function(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
      usuarios.splice(index, 1);
      salvarUsuarios(usuarios);
      renderTabela(filtro.value);
    }
  }

  window.editarUsuario = function(index) {
    const u = usuarios[index];
    localStorage.setItem("usuarioEditando", JSON.stringify({ index, ...u }));
    window.location.href = "perfil.html";
  }
}

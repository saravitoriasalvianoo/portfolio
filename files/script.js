/* =========================================================
   PORTFÓLIO DA SARA VITÓRIA
   Aqui ficam os DADOS (projetos e contatos) e as interações.
   Para atualizar o site, mexa só nas duas listas abaixo.
   ========================================================= */

/* ---------- 1. MEUS PROJETOS ----------
   Para adicionar um projeto novo, copie um bloco { ... } e preencha.
   - imagem: caminho de uma captura de tela, ex: "img/imc.png" (deixe "" se não tiver)
   - demo:   link do projeto publicado (deixe "" se não tiver; o botão some)
   - Confira as tecnologias de cada projeto e ajuste se precisar. */
const projetos = [
  {
    nome: "Calculadora de IMC",
    descricao: "Calculadora que calcula o Índice de Massa Corporal a partir dos dados informados.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagem: "",
    demo: "",
    github: "https://github.com/saravitoriasalvianoo/Calculadora-IMC"
  },
  {
    nome: "Clínica Médica",
    descricao: "Site para uma clínica médica, desenvolvido durante meus estudos.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagem: "",
    demo: "",
    github: "https://github.com/saravitoriasalvianoo/clinicamedica"
  },
  {
    nome: "Horário",
    descricao: "Projeto de horário desenvolvido durante meus estudos.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagem: "",
    demo: "",
    github: "https://github.com/saravitoriasalvianoo/hor-rio"
  }
];

/* ---------- 2. MEUS CONTATOS ----------
   Cole o link real dentro das aspas. Se ficar "", o botão não aparece.
   - email: coloque só o endereço, ex: "nome@email.com" */
const contatos = {
  github: "https://github.com/saravitoriasalvianoo",
  linkedin: "",
  email: ""
};

/* =========================================================
   A PARTIR DAQUI É O FUNCIONAMENTO DO SITE
   ========================================================= */

/* ---------- Cria os cartões de projetos ---------- */
function montarProjetos() {
  const area = document.getElementById("listaProjetos");

  // Sem projetos: mostra a mensagem
  if (projetos.length === 0) {
    area.innerHTML =
      '<p class="vazio">Novas ideias estão sendo transformadas em projetos. Em breve, novidades por aqui!</p>';
    return;
  }

  projetos.forEach(function (p) {
    const cartao = document.createElement("article");
    cartao.className = "projeto revelar";

    // Imagem do projeto, ou a inicial do nome como enfeite
    const visual = p.imagem
      ? '<div class="projeto-img"><img src="' + p.imagem + '" alt="Captura de tela do projeto ' + p.nome + '"></div>'
      : '<div class="projeto-img" aria-hidden="true">' + p.nome.charAt(0) + "</div>";

    const tags = p.tecnologias.map(function (t) { return "<li>" + t + "</li>"; }).join("");

    // Só cria o botão se o link existir
    const botaoDemo = p.demo ? '<a class="btn-p cheio" href="' + p.demo + '" target="_blank" rel="noopener">Ver projeto</a>' : "";
    const botaoGit = p.github ? '<a class="btn-p' + (p.demo ? "" : " cheio") + '" href="' + p.github + '" target="_blank" rel="noopener">Ver código no GitHub</a>' : "";

    cartao.innerHTML =
      visual +
      '<div class="projeto-corpo">' +
        "<h3>" + p.nome + "</h3>" +
        "<p>" + p.descricao + "</p>" +
        '<ul class="tags" aria-label="Tecnologias utilizadas">' + tags + "</ul>" +
        '<div class="projeto-botoes">' + botaoDemo + botaoGit + "</div>" +
      "</div>";

    area.appendChild(cartao);
  });
}

/* ---------- Cria os botões de contato ---------- */
function montarContatos() {
  const area = document.getElementById("contatoLinks");
  const lista = [
    { rotulo: "GitHub", link: contatos.github },
    { rotulo: "LinkedIn", link: contatos.linkedin },
    { rotulo: "E-mail", link: contatos.email ? "mailto:" + contatos.email : "" }
  ];

  lista.forEach(function (c) {
    if (!c.link) return; // sem link, sem botão
    const a = document.createElement("a");
    a.className = "btn-p cheio";
    a.href = c.link;
    a.textContent = c.rotulo;
    if (c.rotulo !== "E-mail") { a.target = "_blank"; a.rel = "noopener"; }
    area.appendChild(a);
  });
}

/* ---------- Menu do celular ---------- */
function ativarMenu() {
  const botao = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  function fechar() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }

  botao.addEventListener("click", function () {
    const abrir = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  });

  // Fecha ao escolher um link ou apertar Esc
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", fechar); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });
}

/* ---------- Lista "Além da tecnologia" (abre e fecha) ---------- */
function ativarLinhas() {
  document.querySelectorAll(".linha-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const aberto = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!aberto));
    });
  });
}

/* ---------- Seções aparecem suavemente ao rolar ---------- */
function ativarAnimacao() {
  const itens = document.querySelectorAll(".revelar");

  // Se o navegador não suportar, mostra tudo direto
  if (!("IntersectionObserver" in window)) {
    itens.forEach(function (i) { i.classList.add("visivel"); });
    return;
  }

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        observador.unobserve(e.target); // anima só uma vez
      }
    });
  }, { threshold: 0.15 });

  itens.forEach(function (i) { observador.observe(i); });
}

/* ---------- Botão de voltar ao topo ---------- */
function ativarTopo() {
  const botao = document.getElementById("topoBtn");

  window.addEventListener("scroll", function () {
    botao.hidden = window.scrollY < 600;
  });

  botao.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Liga tudo quando a página carrega ---------- */
montarProjetos();
montarContatos();
ativarMenu();
ativarLinhas();
ativarAnimacao();
ativarTopo();

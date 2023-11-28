const key = "69a3b7ca4216b5feb2b79b3f2105bc50";

function dadosNaTela(dados) {
  console.log(dados);
  document.querySelector(".cidade").innerHTML = "Tempo em: " + dados.name;

  /*document.querySelector(".cidade").style.opaciy = 1;*/
  document.querySelector(".temperatura").innerHTML =
    Math.floor(dados.main.temp) + "°C";
  document.querySelector(".txt-previsao").innerHTML =
    dados.weather[0].description;
  document.querySelector(".umidade").innerHTML = dados.main.humidity + "%";
  document.querySelector(
    ".img-previ"
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  document.getElementById(
    "bandeira"
  ).className = `fi fi-${dados.sys.country.toLowerCase()}`;
  document.getElementById("bandeira").style.opacity = 1;
}

async function buscarCidade(cidade) {
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
  )
    .then((response) => response.json())
    .catch((error) => {
      exibirMensagemErro();
    });

  if (dados.cod === "404" || !dados.name) {
    exibirMensagemErro();
  } else {
    dadosNaTela(dados);
  }
}


function exibirMensagemErro() {
  document.querySelector(".cidade").textContent = "Cidade não encontrada";
  document.querySelector(".temperatura").textContent = "";
  document.querySelector(".txt-previsao").textContent = "";
  document.querySelector(".umidade").textContent = "";
  document.querySelector(".img-previ").style.display = "none";
  document.getElementById("bandeira").style.opacity = 0;
}

function clicarBotao() {
  const cidade = document.querySelector(".input-cidade").value.trim();

  if (cidade !== "404") {
    buscarCidade(cidade);
  } else {
    console.log("Por favor Insira o nome de uma cidade");
  }
}

document
  .querySelector(".input-cidade")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const cidade = event.target.value;
      buscarCidade(cidade);
    }
  });

// const meta = document.getElementById("metaFinanceira");
// meta.addEventListener("input", function (e) {
//     let value = e.target.value.replace(/\D/g, "");

//     if (value.length > 8) {
//         value = value.substring(0, 8);
//     }

//     value = (parseFloat(value) / 100).toFixed(2);

//     value = value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//     e.target.value = "R$ " + value;
// });

const edit = document.getElementById("editar");
const save = document.getElementById("salvar");
const cancel = document.getElementById("cancelar");
const inputs = document.getElementsByClassName("input");
const confirm = document.getElementById("confirmeSenha");

edit.addEventListener("click", function (event) {
  event.preventDefault;
  edit.disabled = true;
  save.disabled = false;
  cancel.disabled = false;
  confirm.style.display = "block";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
});

cancel.addEventListener("click", function () {
  setTimeout(() => {
    edit.disabled = false;
    save.disabled = true;
    cancel.disabled = true;
    confirm.style.display = "none";
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
  }, 100);
});

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById("rua").value = conteudo.logradouro;
      document.getElementById("bairro").value = conteudo.bairro;
      document.getElementById("cidade").value = conteudo.localidade;
      document.getElementById("uf").value = conteudo.uf;
  } //end if.
  else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
          //Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById("rua").value = "...";
          document.getElementById("bairro").value = "...";
          document.getElementById("cidade").value = "...";
          document.getElementById("uf").value = "...";

          //Cria um elemento javascript.
          var script = document.createElement("script");

          //Sincroniza com o callback.
          script.src =
              "https://viacep.com.br/ws/" +
              cep +
              "/json/?callback=meu_callback";

          //Insere script no documento e carrega o conteúdo.
          document.body.appendChild(script);
      } //end if.
      else {
          //cep é inválido.
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
      }
  } //end if.
  else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const voltarBtn = document.querySelector('.voltar');
  const proximaBtn = document.querySelector('.proxima');
  const images = document.querySelector('.images');
  const wrapper = document.getElementById("images-wrapper");

  const imgWidth = 400;
  const gap = 20;
  const totalImagens = images.children.length;
  const visibleWidth = wrapper.clientWidth;

  let index = 0;

  voltarBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      images.style.transform = `translateX(-${index * (imgWidth + gap)}px)`;
    }
  });

  proximaBtn.addEventListener('click', () => {
    const deslocamentoAtual = (index + 1) * (imgWidth + gap);
    const totalContentWidth = totalImagens * imgWidth + (totalImagens - 1) * gap;

    if (deslocamentoAtual - 420 <= totalContentWidth - visibleWidth) {
      index++;
      images.style.transform = `translateX(-${index * (imgWidth + gap)}px)`;
    }
  });
});

const modal = document.getElementById("modal");
const close = document.getElementById("closeModal");

close.addEventListener("click", function(){
  modal.style.display = "none";
})
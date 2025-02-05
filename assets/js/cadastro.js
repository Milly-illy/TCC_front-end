// Acessar os elementos
const uploadContainer = document.getElementById('upload-container');
const fileInput = document.getElementById('file-upload');

// Função para prevenir o comportamento padrão (prevenir que o navegador abra os arquivos arrastados)
function handleDragOver(event) {
  event.preventDefault(); // Impede que o arquivo seja aberto pelo navegador
  uploadContainer.classList.add('dragover'); // Alterar o estilo da área quando o arquivo for arrastado sobre ela
}

// Função para tratar o momento de "soltar" o arquivo
function handleDrop(event) {
  event.preventDefault(); // Impede que o arquivo seja aberto pelo navegador
  uploadContainer.classList.remove('dragover'); // Remover o estilo da área quando o arquivo for soltado

  // Obter os arquivos arrastados
  const files = event.dataTransfer.files;

  // Adicionar os arquivos ao input de arquivo
  if (files.length > 0) {
    fileInput.files = files; // Atribui os arquivos ao campo de input de arquivos
    // Aqui você pode manipular a imagem ou mostrar uma prévia dela, por exemplo
  }
}

// Função para prevenir o comportamento padrão em todo o documento (evitar que os arquivos sejam abertos como links)
function preventDefaultBehavior(event) {
  event.preventDefault(); // Impede que o navegador faça qualquer ação padrão com os arquivos arrastados
}

// Adicionar eventos de dragover e drop
uploadContainer.addEventListener('dragover', handleDragOver);
uploadContainer.addEventListener('drop', handleDrop);

// Adicionar eventos para prevenir o comportamento padrão no resto da página
window.addEventListener('dragover', preventDefaultBehavior); // Impede o comportamento de abrir arquivo
window.addEventListener('drop', preventDefaultBehavior); // Impede o comportamento de abrir arquivo






function handleDrop(event) {
    event.preventDefault();
    uploadContainer.classList.remove('dragover');
  
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
  
      // Exibindo a imagem (prévia)
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.maxWidth = '100%';  // Ajuste de tamanho da imagem
        imgElement.style.maxHeight = '100%';
        uploadContainer.innerHTML = ''; // Limpa o conteúdo da área de upload
        uploadContainer.appendChild(imgElement); // Adiciona a imagem como prévia
      };
      reader.readAsDataURL(files[0]); // Lê o arquivo como URL para exibir a imagem
    }
  }
  
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar o formulário e o overlay quando o botão for clicado
    document.querySelector(".primario").addEventListener("click", function() {
        document.getElementById("formOverlay").style.display = "flex";  // Exibe o overlay
        document.getElementById("form-container").style.display = "block";  // Exibe o formulário
    });

    // Fechar o formulário ao clicar no botão de fechar
    document.getElementById("fchrForm").addEventListener("click", function() {
        // Esconde o overlay e o formulário
        document.getElementById("formOverlay").style.display = "none";
        document.getElementById("form-container").style.display = "none";
    });

    // Submissão do formulário
    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Impedir o submit de dar refresh na página

        // Coletar os dados do formulário
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let altura = document.getElementById("altura").value;
        let peso = document.getElementById("peso").value;
        let genero = document.getElementById("genero").value;

        // Validar se todos os campos estão preenchidos
        if (!nome || !idade || !altura || !peso || !genero) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Coletar a imagem do perfil
        let imagem = document.getElementById("imagem").files[0];

        // Se o usuário enviou imagem, salvar no local storage
        if (imagem) {
            let reader = new FileReader();
            reader.onloadend = function () {
                localStorage.setItem('perfilImagem', reader.result);
                document.getElementById('perfilImagem').src = reader.result;
            };
            reader.readAsDataURL(imagem);
        }

        // Atualizar os dados exibidos no perfil
        document.getElementById("nomeDisplay").textContent = nome;
        document.getElementById("idadeDisplay").textContent = idade;
        document.getElementById("alturaDisplay").textContent = altura + " cm";
        document.getElementById("pesoDisplay").textContent = peso + " kg";

        let generoText;
        if (genero === "masculino") {
            generoText = "♂ Masculino";
        } else if (genero === "feminino") {
            generoText = "♀ Feminino";
        } else {
            generoText = "🏳️‍🌈 LGBT+";
        }

        document.getElementById("generoDisplay").textContent = generoText;

        // Salvar no local storage
        localStorage.setItem('nome', nome);
        localStorage.setItem('idade', idade);
        localStorage.setItem('altura', altura);
        localStorage.setItem('peso', peso);
        localStorage.setItem('genero', genero);

        // Fechar o formulário e o overlay após salvar
        document.getElementById("formOverlay").style.display = "none";
        document.getElementById("form-container").style.display = "none";
    });

    // Verificar se há dados no Local Storage e preencher o perfil
    const nome = localStorage.getItem('nome');
    const idade = localStorage.getItem('idade');
    const altura = localStorage.getItem('altura');
    const peso = localStorage.getItem('peso');
    const genero = localStorage.getItem('genero');
    const perfilImagem = localStorage.getItem('perfilImagem');
    const nota = localStorage.getItem('nota');  // Novo item no localStorage para a nota

    if (nome && idade && altura && peso && genero) {
        document.getElementById("nomeDisplay").textContent = nome;
        document.getElementById("idadeDisplay").textContent = idade;
        document.getElementById("alturaDisplay").textContent = altura + " cm";
        document.getElementById("pesoDisplay").textContent = peso + " kg";

        let generoText;
        if (genero === "masculino") {
            generoText = "♂ Masculino";
        } else if (genero === "feminino") {
            generoText = "♀ Feminino";
        } else {
            generoText = "🏳️‍🌈 LGBT+";
        }
        document.getElementById("generoDisplay").textContent = generoText;
    }

    if (perfilImagem) {
        document.getElementById('perfilImagem').src = perfilImagem;
    }

    if (nota) {
        document.getElementById('notaLink').textContent = nota;
        document.getElementById('notaLink').href = "#"; // Mantém a funcionalidade de link
    }

    // Botão Editar - Ativar os campos de edição
    document.querySelector(".dist").addEventListener("click", function() {
        const editar = document.getElementById("registro").classList.toggle("editar");

        // Campos de visualização e edição
        const camposVisuais = [
            "nomeDisplay", "idadeDisplay", "alturaDisplay", "pesoDisplay", "generoDisplay", "notaLink"
        ];
        const camposEdicao = [
            "nomeEdit", "idadeEdit", "alturaEdit", "pesoEdit", "generoEdit", "imagemEdit", "notaEdit"
        ];

        // Alternar entre visualização e edição
        camposVisuais.forEach(function(id) {
            document.getElementById(id).style.display = editar ? "none" : "inline";
        });

        camposEdicao.forEach(function(id) {
            document.getElementById(id).style.display = editar ? "block" : "none";
        });

        // Preencher os campos de edição com os valores atuais
        if (nome) document.getElementById("nomeEdit").value = nome;
        if (idade) document.getElementById("idadeEdit").value = idade;
        if (altura) document.getElementById("alturaEdit").value = altura;
        if (peso) document.getElementById("pesoEdit").value = peso;
        if (genero) document.getElementById("generoEdit").value = genero;
        if (nota) document.getElementById("notaEdit").value = nota; // Preencher a nota no campo de edição
    });

    // Editar a Nota: Substituir a tag <a> por um input (textarea) para edição de texto longo
    document.querySelector(".dist").addEventListener("click", function() {
        const editar = document.getElementById("registro").classList.contains("editar");

        // Acessar a tag <a> onde a nota está sendo exibida
        const notaLink = document.getElementById('notaLink');

        // Verifica se a nota está sendo editada (se já existe um input no lugar)
        if (editar && !notaLink.querySelector('textarea')) {
            // Criar o campo textarea para edição da nota
            const textareaNota = document.createElement('textarea');
            textareaNota.value = notaLink.textContent.trim(); // Preencher com o texto atual da nota
            textareaNota.id = 'notaInput';  // Definir o ID para o textarea
            textareaNota.classList.add('inputNota');  // Adicionar uma classe para o estilo
            textareaNota.rows = 4;  // Definir uma altura adequada para o texto longo
            textareaNota.style.width = '100%';  // Ajustar o tamanho do textarea para a largura completa
            notaLink.replaceWith(textareaNota);  // Substituir a tag <a> pelo textarea

            // Focar no campo textarea
            textareaNota.focus();

            // Atualizar a nota no localStorage quando a edição for concluída (ao perder o foco)
            textareaNota.addEventListener('blur', function() {
                const novaNota = textareaNota.value.trim();
                if (novaNota) {
                    // Salvar no localStorage
                    localStorage.setItem('nota', novaNota);

                    // Substituir o textarea novamente pela tag <a>
                    const notaElemento = document.createElement('a');
                    notaElemento.href = "#";
                    notaElemento.textContent = novaNota;
                    textareaNota.replaceWith(notaElemento);
                }
            });
        }
    });
});

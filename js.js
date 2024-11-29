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

    // Botões Editar, Salvar e Apagar
    const editarBotao = document.querySelector(".dist");
    const apagarBotao = document.querySelector(".apagar");

    // Carregar os valores do localStorage nos campos de edição ao clicar em "✎ Editar"
    editarBotao.addEventListener("click", function() {
        if (editarBotao.textContent === "✎ Editar") {
            // Modo de edição ativado
            document.getElementById("registro").classList.add("editar");

            // Mostrar campos de edição e esconder os campos de visualização
            const camposVisuais = [
                "nomeDisplay", "idadeDisplay", "alturaDisplay", "pesoDisplay", "generoDisplay", "perfilImagem"
            ];
            const camposEdicao = [
                "nomeEdit", "idadeEdit", "alturaEdit", "pesoEdit", "generoEdit", "imagemEdit"
            ];

            camposVisuais.forEach(function(id) {
                document.getElementById(id).style.display = "none";
            });

            camposEdicao.forEach(function(id) {
                document.getElementById(id).style.display = "block";
            });

            // Preencher os campos de edição com os valores atuais
            document.getElementById("nomeEdit").value = nome;
            document.getElementById("idadeEdit").value = idade;
            document.getElementById("alturaEdit").value = altura;
            document.getElementById("pesoEdit").value = peso;
            document.getElementById("generoEdit").value = genero;

            // Alterar o texto do botão de editar para salvar
            editarBotao.textContent = "✓ Salvar";
            apagarBotao.classList.add("disabled"); // Desabilitar o botão Apagar
        } else {
            // Modo de salvar ativado
            // Capturar os dados dos campos de edição
            const novoNome = document.getElementById("nomeEdit").value;
            const novaIdade = document.getElementById("idadeEdit").value;
            const novaAltura = document.getElementById("alturaEdit").value;
            const novoPeso = document.getElementById("pesoEdit").value;
            const novoGenero = document.getElementById("generoEdit").value;
            const novaImagem = document.getElementById("imagemEdit").files[0];

            // Salvar os novos dados no localStorage
            localStorage.setItem('nome', novoNome);
            localStorage.setItem('idade', novaIdade);
            localStorage.setItem('altura', novaAltura);
            localStorage.setItem('peso', novoPeso);
            localStorage.setItem('genero', novoGenero);

            // Salvar a nova imagem, se houver
            if (novaImagem) {
                let reader = new FileReader();
                reader.onloadend = function() {
                    localStorage.setItem('perfilImagem', reader.result);
                    document.getElementById('perfilImagem').src = reader.result;
                };
                reader.readAsDataURL(novaImagem);
            }

            // Atualizar a exibição
            document.getElementById("nomeDisplay").textContent = novoNome;
            document.getElementById("idadeDisplay").textContent = novaIdade;
            document.getElementById("alturaDisplay").textContent = novaAltura + " cm";
            document.getElementById("pesoDisplay").textContent = novoPeso + " kg";

            let generoText;
            if (novoGenero === "masculino") {
                generoText = "♂ Masculino";
            } else if (novoGenero === "feminino") {
                generoText = "♀ Feminino";
            } else {
                generoText = "🏳️‍🌈 LGBT+";
            }
            document.getElementById("generoDisplay").textContent = generoText;

            // Voltar para o estado "Editar"
            editarBotao.textContent = "✎ Editar";
            apagarBotao.classList.remove("disabled"); // Reabilitar o botão Apagar

            // Desabilitar modo de edição
            document.getElementById("registro").classList.remove("editar");

            // Esconder campos de edição e mostrar os campos de visualização
            const camposVisuais = [
                "nomeDisplay", "idadeDisplay", "alturaDisplay", "pesoDisplay", "generoDisplay", "perfilImagem"
            ];
            const camposEdicao = [
                "nomeEdit", "idadeEdit", "alturaEdit", "pesoEdit", "generoEdit", "imagemEdit"
            ];

            camposVisuais.forEach(function(id) {
                document.getElementById(id).style.display = "inline";
            });

            camposEdicao.forEach(function(id) {
                document.getElementById(id).style.display = "none";
            });
        }
    });

});

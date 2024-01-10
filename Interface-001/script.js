    // Impedir que os campos sejam preenchidos com caracteres não desejados
    document.getElementById('telefone-usuario').addEventListener('input', function (event) {
        let input = event.target;
        let inputValue = input.value.replace(/\D/g, '');
        let formattedValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        input.value = formattedValue;
    });

    document.getElementById('idade-usuario').addEventListener('input', function (event) {
        let input = event.target;
        let inputValue = input.value.replace(/\D/g, '');

        if (inputValue !== '') {
            input.value = parseInt(inputValue, 10);
        } else {
            input.value = '';
        }
    });

    function enviarDados() {
        // Obter as informações pessoais
        var name = document.getElementsByName('nome-usuario')[0].value;
        var email = document.getElementsByName('email-usuario')[0].value;
        var celular = document.getElementsByName('telefone-usuario')[0].value;
        var dataNascimento = document.getElementsByName('data-nascimento')[0].value;
        var age = document.getElementsByName('idade-usuario')[0].value;
        var gender = document.getElementsByName('genero-usuario')[0].value;

        // Obter as informações de login
        var login = document.getElementsByName('login-usuario')[0].value;
        var senha = document.getElementsByName('senha-usuario')[0].value;
        var senha2 = document.getElementsByName('senha-usuario-2')[0].value;
        
        // Retirar caracteres não desejados
        celular = celular.replace(/\D/g, '');

        // Verificar se a chave existe no banco de dados 
        var vetorExistente = JSON.parse(localStorage.getItem('usuarios'));

        if (vetorExistente == null) {
            var usuarios = [];
        } else {
            var usuarios = vetorExistente;
        }

        var usuario = { name, email, celular, dataNascimento, age, gender, login, senha };

        // Ocultar mensagens de erro
        document.getElementById('email-existente').style.display = 'none';
        document.getElementById('telefone-existente').style.display = 'none';
        document.getElementById('usuario-existente').style.display = 'none';
        document.getElementById('erro-caractere').style.display = 'none';
        document.getElementById('inputs-vazios').style.display = 'none';
        document.getElementById('erro-senha').style.display = 'none';

        // Verificar se os dados já existem no banco de dados
        var usuarioExistente = false;

        if (name === '' || email === '' || celular === '' || dataNascimento === '' || age === '' || gender === '' || login === '' || senha === '') {
            document.getElementById('inputs-vazios').style.display = 'block';
            usuarioExistente = true;
        }
        
        // Verificar se senha2 é diferente de senha
        if (senha2 !== senha) {
            document.getElementById('erro-senha').style.display = 'inline';
            usuarioExistente = true;
        }
        
        // Verificar existência do usuário
        for (var i = 0; i < usuarios.length; i++) {
            if (email === usuarios[i].email) {
                document.getElementById('email-existente').style.display = 'inline';
                usuarioExistente = true;
            }
        
            if (celular === usuarios[i].celular) {
                document.getElementById('telefone-existente').style.display = 'inline';
                usuarioExistente = true;
            }
        
            if (login === usuarios[i].login) {
                document.getElementById('usuario-existente').style.display = 'inline';
                usuarioExistente = true;
            }
        }
        
        // Verificar espaços em branco no Login
        for (var i = 0; i < login.length; i++) {
            var caractere = login[i];
        
            if (caractere === ' ') {
                document.getElementById('erro-caractere').style.display = 'inline';
                usuarioExistente = true;
                break;
            }
        }
        
        // Impedir o envio do formulário se houver algum problema
        if (usuarioExistente) {
            event.preventDefault();
        }

        // Adicionar o usuário ao banco de dados
        if (!usuarioExistente) {
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            document.getElementsByTagName('fieldset')[0].style.display = 'none';
            document.getElementsByTagName('fieldset')[1].style.display = 'none';
            document.getElementById('sucesso').style.display = 'flex';
            event.preventDefault();
        }
    }

    function logar() {
        var login = document.getElementsByName('login-usuario')[0].value;
        var senha = document.getElementsByName('senha-login')[0].value;

        var usuarioExistente = 0;

        // Validar campos 
        var inputsVazio = document.getElementById('inputs-vazios');
        var usuario = JSON.parse(localStorage.getItem('usuarios'));

        document.getElementById('usuario-nao-existente').style.display = 'none';
        document.getElementById('erro-senha-login').style.display = 'none';
        inputsVazio.style.display = 'none';


        if (login === '' || senha === '') {
            inputsVazio.style.display = 'block';
            event.preventDefault();
        } else {
            for (var i = 0; i < usuario.length; i++) {
                if (login === usuario[i].login && senha === usuario[i].senha) {
                    document.getElementsByTagName('fieldset')[0].style.display = 'none';
                    document.getElementById('sucesso').style.display = 'flex';
                } else if (login === usuario[i].login) {
                    usuarioExistente = 1;
                    if (senha !== usuario[i].senha) {
                        console.log(usuario[i].senha);
                        document.getElementById('erro-senha-login').style.display = 'inline';
                        event.preventDefault();
                    }
                }
            }

            if (usuarioExistente === 0) {
                document.getElementById('usuario-nao-existente').style.display = 'inline';
                event.preventDefault();
            }
        }

        event.preventDefault();
    }
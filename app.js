document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');
    const playerIdInput = document.getElementById('player-id');
    const nomeInput = document.getElementById('nome');
    const posicaoInput = document.getElementById('posicao');
    const clubeInput = document.getElementById('clube');
    const fotoInput = document.getElementById('foto');
    const golsInput = document.getElementById('gols');
    const assistenciasInput = document.getElementById('assistencias');
    const jogosInput = document.getElementById('jogos');
    const playerListDiv = document.getElementById('player-list');
    const clearFormButton = document.getElementById('clear-form-button');

    const STORAGE_KEY = 'female_football_players';

    // Dados iniciais
    const initialPlayers = [
        {
            "id": 1,
            "nome": "Andressa Alves",
            "posicao": "Meio-campo",
            "clube": "Corinthians",
            "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Andressa_Alves_2019.jpg/200px-Andressa_Alves_2019.jpg",
            "gols": 15,
            "assistencias": 10,
            "jogos": 28,
            "favorita": false
        },
        {
            "id": 2,
            "nome": "Dayana Rodríguez",
            "posicao": "Meio-campo",
            "clube": "Corinthians",
            "foto": "https://pbs.twimg.com/media/F315-hUXIAAVk4i.jpg",
            "gols": 5,
            "assistencias": 12,
            "jogos": 30,
            "favorita": false
        },
        {
            "id": 3,
            "nome": "Mariza",
            "posicao": "Zagueira",
            "clube": "Corinthians",
            "foto": "https://cdn.meutimao.com.br/_upload/jogador/2023/04/27/mariza_12503_grande.jpeg",
            "gols": 2,
            "assistencias": 1,
            "jogos": 32,
            "favorita": false
        },
        {
            "id": 4,
            "nome": "Thaís Regina",
            "posicao": "Zagueira",
            "clube": "Corinthians",
            "foto": "https://cdn.meutimao.com.br/_upload/jogador/2023/04/27/thais_regina_12502_grande.jpeg",
            "gols": 1,
            "assistencias": 2,
            "jogos": 25,
            "favorita": false
        },
        {
            "id": 5,
            "nome": "Letícia Teles",
            "posicao": "Zagueira",
            "clube": "Corinthians",
            "foto": "https://cdn.meutimao.com.br/_upload/jogador/2023/04/27/leticia_teles_12499_grande.jpeg",
            "gols": 0,
            "assistencias": 0,
            "jogos": 18,
            "favorita": false
        }
    ];

    // Função para carregar jogadoras do LocalStorage ou inicializar
    function loadPlayers() {
        let players = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!players || players.length === 0) {
            // Adiciona IDs aos dados iniciais se não existirem
            const playersWithIds = initialPlayers.map((player, index) => ({
                ...player,
                id: player.id || (index + 1)
            }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(playersWithIds));
            return playersWithIds;
        }
        return players;
    }

    // Função para salvar jogadoras no LocalStorage
    function savePlayers(players) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
    }

    // Função para exibir alertas
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000); // Remove o alerta após 3 segundos
    }

    // Função para renderizar a lista de jogadoras
    function renderPlayers() {
        const players = loadPlayers();
        playerListDiv.innerHTML = ''; // Limpa a lista existente

        if (players.length === 0) {
            playerListDiv.innerHTML = '<p>Nenhuma jogadora cadastrada ainda.</p>';
            return;
        }

        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.dataset.id = player.id; // Armazena o ID no dataset do card

            playerCard.innerHTML = `
                <button class="favorite-toggle ${player.favorita ? 'favorited' : ''}" data-id="${player.id}">
                    <i class="${player.favorita ? 'fas' : 'far'} fa-star"></i>
                </button>
                <img src="${player.foto}" alt="Foto de ${player.nome}">
                <h3>${player.nome}</h3>
                <p><strong>Posição:</strong> ${player.posicao}</p>
                <p><strong>Clube:</strong> ${player.clube}</p>
                <div class="stats">
                    <span>Gols: ${player.gols}</span>
                    <span>Assistências: ${player.assistencias}</span>
                    <span>Jogos: ${player.jogos}</span>
                </div>
                <div class="actions">
                    <button class="edit-button" data-id="${player.id}">Editar</button>
                    <button class="delete-button" data-id="${player.id}">Remover</button>
                </div>
            `;
            playerListDiv.appendChild(playerCard);
        });

        // Adiciona event listeners para os botões após renderizar
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = parseInt(event.target.dataset.id);
                editPlayer(id);
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = parseInt(event.target.dataset.id);
                deletePlayer(id);
            });
        });

        document.querySelectorAll('.favorite-toggle').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = parseInt(event.currentTarget.dataset.id);
                toggleFavorite(id);
            });
        });
    }

    // Função para limpar o formulário
    function clearForm() {
        playerIdInput.value = '';
        nomeInput.value = '';
        posicaoInput.value = '';
        clubeInput.value = '';
        fotoInput.value = '';
        golsInput.value = 0;
        assistenciasInput.value = 0;
        jogosInput.value = 0;
        playerForm.querySelector('button[type="submit"]').textContent = 'Salvar Jogadora';
    }

    // Event listener para o formulário de adicionar/editar
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validação básica para campos vazios
        if (!nomeInput.value || !posicaoInput.value || !clubeInput.value || !fotoInput.value) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const players = loadPlayers();
        const id = playerIdInput.value ? parseInt(playerIdInput.value) : null;

        const newPlayer = {
            nome: nomeInput.value,
            posicao: posicaoInput.value,
            clube: clubeInput.value,
            foto: fotoInput.value,
            gols: parseInt(golsInput.value),
            assistencias: parseInt(assistenciasInput.value),
            jogos: parseInt(jogosInput.value),
            favorita: false // Valor padrão, pode ser alterado depois
        };

        if (id) {
            // Edição
            const playerIndex = players.findIndex(p => p.id === id);
            if (playerIndex !== -1) {
                newPlayer.id = id;
                newPlayer.favorita = players[playerIndex].favorita; // Mantém o status de favorita
                players[playerIndex] = newPlayer;
                showAlert('Jogadora editada com sucesso!');
            }
        } else {
            // Cadastro
            newPlayer.id = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
            players.push(newPlayer);
            showAlert('Jogadora adicionada com sucesso!');
        }

        savePlayers(players);
        renderPlayers();
        clearForm();
    });

    // Função para preencher o formulário para edição
    function editPlayer(id) {
        const players = loadPlayers();
        const playerToEdit = players.find(p => p.id === id);

        if (playerToEdit) {
            playerIdInput.value = playerToEdit.id;
            nomeInput.value = playerToEdit.nome;
            posicaoInput.value = playerToEdit.posicao;
            clubeInput.value = playerToEdit.clube;
            fotoInput.value = playerToEdit.foto;
            golsInput.value = playerToEdit.gols;
            assistenciasInput.value = playerToEdit.assistencias;
            jogosInput.value = playerToEdit.jogos;
            playerForm.querySelector('button[type="submit"]').textContent = 'Atualizar Jogadora';
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o formulário
        }
    }

    // Função para deletar uma jogadora
    function deletePlayer(id) {
        if (confirm('Tem certeza que deseja remover esta jogadora?')) {
            let players = loadPlayers();
            players = players.filter(p => p.id !== id);
            savePlayers(players);
            renderPlayers();
            showAlert('Jogadora removida com sucesso!');
            clearForm(); // Limpa o formulário caso a jogadora deletada estivesse sendo editada
        }
    }

    // Função para favoritar/desfavoritar uma jogadora
    function toggleFavorite(id) {
        let players = loadPlayers();
        const playerIndex = players.findIndex(p => p.id === id);

        if (playerIndex !== -1) {
            players[playerIndex].favorita = !players[playerIndex].favorita;
            savePlayers(players);
            renderPlayers(); // Renderiza novamente para atualizar o ícone
            showAlert(players[playerIndex].favorita ? 'Jogadora adicionada aos favoritos!' : 'Jogadora removida dos favoritos!');
        }
    }

    // Event listener para o botão de limpar formulário
    clearFormButton.addEventListener('click', clearForm);

    // Renderiza as jogadoras na primeira carga da página
    renderPlayers();
});
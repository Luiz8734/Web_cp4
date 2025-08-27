// Dados iniciais das jogadoras
let initialPlayers = [
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

window.onload = function () {
    if (localStorage.getItem("players") === null) {
        localStorage.setItem("players", JSON.stringify(initialPlayers));
    }

    displayPlayers();

    // Faz o formulário funcionar para adicionar jogadoras
    let form = document.getElementById("jogadoraForm");
    form.addEventListener("submit", addPlayer);

    const playerList = document.getElementById('player-list');
    playerList.addEventListener('click', function (event) {
        const clickedButton = event.target.closest('.delete-button');// Para nao exibir a mensagem 2 vezes (bug)
        if (clickedButton) {
            deletePlayer(clickedButton);
        }
    });
};

// Função para exibir os cards das jogadoras
function displayPlayers() {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Limpa a lista antes de adicionar os cards

    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('card-post');

        playerElement.innerHTML = `
            <h3>${player.nome}</h3>
            <p>Posição: ${player.posicao}</p>
            <p>Clube: ${player.clube}</p>
            <img src="${player.foto}" alt="Foto de ${player.nome}" style="max-width:150px;">
            <p>Gols: ${player.gols}</p>
            <p>Assistências: ${player.assistencias}</p>
            <p>Jogos: ${player.jogos}</p>

            <button class="edit-button" data-id="${player.id}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
            <button class="delete-button" data-id="${player.id}"><i class="fa-solid fa-eraser"></i> Apagar</button>
        `;
        playerList.appendChild(playerElement);
    });
    
}

// Adiciona nova jogadora
function addPlayer(event) {
    event.preventDefault();

    const newPlayer = {
        id: Date.now(), // Garante um ID único baseado no timestamp atual
        nome: document.getElementById('nome').value,
        posicao: document.getElementById('posicao').value,
        clube: document.getElementById('clube').value,
        foto: document.getElementById('foto').value,
        gols: Number(document.getElementById('gols').value),
        assistencias: Number(document.getElementById('assistencias').value),
        jogos: Number(document.getElementById('jogos').value),
        favorita: false
    };

    let players = JSON.parse(localStorage.getItem("players")) || []; // Garante que 'players' é um array

    players.unshift(newPlayer); // Adiciona a nova jogadora no início da lista

    localStorage.setItem("players", JSON.stringify(players));

    document.getElementById('jogadoraForm').reset();
    alert("Jogadora adicionada com sucesso!");
    displayPlayers(); // Atualiza a exibição das jogadoras
}

// Função para deletar uma jogadora
function deletePlayer(buttonElement) {
    const idToDelete = parseInt(buttonElement.dataset.id);
    let players = JSON.parse(localStorage.getItem("players")) || [];

    localStorage.setItem("players", JSON.stringify(players.filter(player => player.id !== idToDelete)));

    displayPlayers(); // Atualiza a exibição das jogadoras após a exclusão
    alert("Jogadora apagada com sucesso!");
}
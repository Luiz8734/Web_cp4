// Dados iniciais das jogadoras
let initialPlayers = [
    {
        "id": 1,
        "nome": "Andressa Alves",
        "posicao": "Meio-campo",
        "clube": "Corinthians",
        "foto": "https://imgs.search.brave.com/gbuCbhClpF4xWq4i1MSuo1DxP_sVUxQUcUTYc_80G-Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bWV1dGltYW8uY29t/LmJyL191cGxvYWQv/bm90aWNpYS8yMDI0/LzEyLzEzL28tY29y/aW50aGlhbnMtYW51/bmNpb3UtYW5kcmVz/c2EtYWx2ZXMtcGFy/YS0yMDI1LWp0OTQx/dy5qcGc",
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
        "foto": "https://cdn.meutimao.com.br/_upload/jogador/dayana-lisset-rodriguez-leon-no-corinthians_a.jpg",
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
        "foto": "https://imgs.search.brave.com/JttraY5CnG_Ut7d7iWUQSzuIO2zRn4D-5GzJf5bEB7U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aW1nLnplcm96ZXJv/LnB0L2ltZy9qb2dh/ZG9yZXMvbmV3LzY0/LzA1LzUyNjQwNV9t/YXJpemFfMjAyNTA3/MjMxOTQwMDAucG5n",
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
        "foto": "https://imgs.search.brave.com/2w-BPaUcsE5nQ5QXCeb4NUXbj7-t-L53_ra5NmmLnWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY29yaW50aGlh/bnMuY29tLmJyL3Vw/bG9hZHMvMTc1MDk0/Njk3MWExMWRjMzNk/OTA4OGI4MmY4MGRj/ZGE5ODQxNjM2MjI5/LnBuZw",
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
        "foto": "https://imgs.search.brave.com/ZEylpJ77IoZs8ZjUEbXTtPE0p9gW6WU6czGvdY0vMYA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY29yaW50aGlh/bnMuY29tLmJyL3Vw/bG9hZHMvMTc1MDk0/NjM2OWNkY2IyZjVj/N2IwNzExNDM1Mjll/ZjdmMjcwNWRmYmM0/LnBuZw",
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
            <img src="${player.foto}" alt="Foto de ${player.nome}" style="max-width:150px;">
            <h3>${player.nome}</h3>
            <p>Posição: ${player.posicao}</p>
            <p>Clube: ${player.clube}</p>          
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

    const novoJogador = {
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

    players.unshift(novoJogador); // Adiciona a nova jogadora no início da lista

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
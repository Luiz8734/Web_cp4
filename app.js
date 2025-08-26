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
    // Se não tiver nada no LocalStorage, salva os jogadores iniciais
    if (!localStorage.getItem("players")) {
        localStorage.setItem("players", JSON.stringify(initialPlayers));
    }

    displayPlayers();
    document.getElementById('jogadoraForm').addEventListener('submit', addPlayer);
};
// Função para exibir os cards das jogadoras
function displayPlayers() {
    // Obtém as jogadoras do LocalStorage e converte de JSON para objeto
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Limpa a lista antes de exibir os jogadores

    // Cria um card para cada jogadora
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
            
            <button><i class="fa-solid fa-pen-to-square"></i> Editar</button>
            <button><i class="fa-solid fa-eraser"></i> Apagar</button>
            <hr style="margin:30px;">
            
            
        `;

        playerList.appendChild(playerElement);
    });
}

//Adiciona nova jogadora
function addPlayer(event) {
    event.preventDefault();

    const newPlayer = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        posicao: document.getElementById('posicao').value,
        clube: document.getElementById('clube').value,
        foto: document.getElementById('foto').value,
        gols: Number(document.getElementById('gols').value),
        assistencias: Number(document.getElementById('assistencias').value),
        jogos: Number(document.getElementById('jogos').value),
        favorita: false
    };

    const players = JSON.parse(localStorage.getItem("players")) || [];
    players.unshift(newPlayer);
    localStorage.setItem("players", JSON.stringify(players));

    document.getElementById('jogadoraForm').reset();
    alert("Jogadora adicionada com sucesso!");
    displayPlayers();
}

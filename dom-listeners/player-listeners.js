// dom-listeners/player-listeners.js

export function setupPlayerListeners() {
    const playerSubNavButtons = document.querySelectorAll('#players-content .player-sub-nav button');
    const allPlayersSearch = document.getElementById('all-players-search');

    playerSubNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.playerSubSection + '-content';
            showPlayerSubSection(targetSection);
        });
    });

    allPlayersSearch.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const filteredPlayers = allPlayersData.filter(player =>
            player.name.toLowerCase().includes(filter)
        );
        renderAllPlayers(filteredPlayers);
    });
}
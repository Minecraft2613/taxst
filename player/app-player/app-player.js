// player/app-player/app-player.js

const allPlayersData = [
    { name: 'Ansh', status: 'Online', edition: 'Java', balance: 1673671.60, taxPaid: 171693.69 },
    { name: '.Atharva3044', status: 'Online', edition: 'Bedrock', balance: 879.97, taxPaid: 23780.87 },
    { name: '.Atharva4617', status: 'Offline', edition: 'Bedrock', balance: 893572.56, taxPaid: 20683 },
];

window.renderAllPlayers = function(playersToRender) {
    const allPlayersList = document.getElementById('all-players-list');
    allPlayersList.innerHTML = '';
    if (playersToRender.length === 0) {
        allPlayersList.innerHTML = '<li>No players found.</li>';
        return;
    }
    playersToRender.forEach(player => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${player.name}:</strong> <span>${player.status}, Edition: ${player.edition}</span>`;
        allPlayersList.appendChild(li);
    });
};

window.showPlayerSubSection = function(sectionId) {
    const playerSubContents = document.querySelectorAll('#players-content .player-sub-content');
    const playerSubNavButtons = document.querySelectorAll('#players-content .player-sub-nav button');

    playerSubContents.forEach(content => {
        content.classList.remove('active');
    });
    playerSubNavButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-player-sub-section="${sectionId.replace('-content', '')}"]`).classList.add('active');

    if (sectionId === 'all-players-content') {
        window.renderAllPlayers(allPlayersData);
    } else if (sectionId === 'top-richest-content') {
        window.renderRichestPlayers();
    } else if (sectionId === 'top-taxed-content') {
        window.renderTaxedPlayers();
    }
};

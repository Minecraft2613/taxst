// player/top-3-most-taxed/top-3-most-taxed.js

const topTaxedData = [...allPlayersData].sort((a, b) => b.taxPaid - a.taxPaid).slice(0, 3);

function renderTaxedPlayers() {
    const taxedPlayersList = document.getElementById('taxed-players-list');
    taxedPlayersList.innerHTML = '';
    topTaxedData.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${index + 1}. ${player.name}:</strong> <span>$${player.taxPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
        taxedPlayersList.appendChild(li);
    });
}

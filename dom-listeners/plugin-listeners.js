// dom-listeners/plugin-listeners.js

export function setupPluginListeners() {
    const pluginSubNavButtons = document.querySelectorAll('#plugins-content .player-sub-nav button');
    const searchInput = document.getElementById("plugin-search");

    pluginSubNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            pluginSubNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPluginFilter = button.dataset.pluginSubSection;
            renderPlugins(pluginsData);
        });
    });

    searchInput.addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        let pluginsToSearch = pluginsData;

        const filteredPlugins = pluginsToSearch.filter(plugin =>
            plugin.name.toLowerCase().includes(filter) ||
            plugin.description.toLowerCase().includes(filter)
        );
        renderPlugins(filteredPlugins);
    });
}
// dom-listeners/navigation-listeners.js

export function setupNavigationListeners() {
    SIDEBAR_NAV_LINKS.forEach(link => {
        if (link.href && link.target === '_blank') {
            link.addEventListener('click', (e) => {
                // Let browser handle
            });
        } else if (link.dataset.section) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection(link.dataset.section);
                toggleSidebar();
            });
        }
    });
}

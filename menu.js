
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("pagina-atual");
            link.setAttribute("aria-current", "page");
        }
    });

    const menuButton = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-menu]");

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            const aberto = menu.classList.toggle("menu-aberto");

            menuButton.setAttribute("aria-expanded", String(aberto));
        });
    }
});

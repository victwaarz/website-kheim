const PLACEHOLDER = "PLACEHOLDER";
const HISTORY = "HISTORY";
const CALENDAR = "CALENDAR";
const CONTACT = "CONTACT";

const HIDDEN_CLASS = "hidden";
const ACTIVE_CLASS = "menu-item-active";

const PAGES = [
    PLACEHOLDER,
    HISTORY,
    CALENDAR,
    CONTACT
];

menuItemsClickListener();

function menuItemsClickListener() {
    const items = document.querySelectorAll(".menu-item");
    for (const menuItem of items) {
        menuItem.addEventListener("click", () => {
            setMenuItemActive(menuItem);
            show(menuItem.dataset.page);
        });
    }
}

function setMenuItemActive(menuItem) {
    const items = document.querySelectorAll(".menu-item");
    for (const item of items) {
        item.classList.toggle(ACTIVE_CLASS, item === menuItem);
    }
}

function show(page) {
    hideEverything();
    setVisibility(page, true);
}

function hideEverything() {
    PAGES.forEach((pageId) => setVisibility(pageId, false));
}

function setVisibility(id, isVisible) {
    const element = document.getElementById(id);
    if (!element) {
        return;
    }
    element.classList.toggle(HIDDEN_CLASS, !isVisible);
}
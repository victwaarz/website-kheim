const PLACEHOLDER = "PLACEHOLDER";
const HISTORY = "HISTORY";
const CALENDAR = "CALENDAR";
const CONTACT = "CONTACT";

const VISIBLE = "inherit";

const PAGES = [
    PLACEHOLDER,
    HISTORY,
    CALENDAR,
    CONTACT
];

menuItemsClickListener();

function menuItemsClickListener() {
    const items = document.getElementsByClassName("menu-item");
    console.log(items);
    for (let menuitem of items) {
        menuitem.addEventListener("click", () => setMenuItemActive(menuitem));
    }
}

function setMenuItemActive(menuitem) {
    console.log("Setting active: ", menuitem);
    const items = document.getElementsByClassName("menu-item");
    for (let item of items) {
        let classes = "menu-item";
        if (item === menuitem) {
            classes += " menu-item-active";
        }
        item.setAttribute("class", classes);
    }
}

function show(page) {
    hideEverything();
    setVisibility(page, VISIBLE);
}

function hideEverything() {
    PAGES.forEach(pageId => setVisibility(pageId, "none"));
}

function setVisibility(id, value) {
    const element = document.getElementById(id);
    element.setAttribute("style", `display: ${value}`);
}
const PLACEHOLDER = "PLACEHOLDER";
const HISTORY = "HISTORY";
const CALENDAR = "CALENDAR";
const CONTACT = "CONTACT";

const HIDDEN_CLASS = "hidden";
const ACTIVE_CLASS = "menu-item-active";
const ACTIVE_FILTER_CLASS = "calendar-filter-btn-active";

const FILTER_UPCOMING = "upcoming";
const FILTER_PAST = "past";

const PAGES = [
    PLACEHOLDER,
    HISTORY,
    CALENDAR,
    CONTACT
];

const EVENTS = [
    {
        title: "Heers Zomert",
        location: "Harmonielokaal Mechelen-Bovelingen",
        date: "06/08/2026",
        time: "19:00",
        url: "https://www.facebook.com/events/2281447659347357"
    },
    {
        title: "Restaurantdag",
        location: "'t Paenhuys, Heers",
        date: "27/09/2026",
        time: "12:00",
        url: null
    },
    {
        title: "Smooth & Swinging: Part 2",
        location: "De Bammerd, Heers",
        date: "14/10/2026",
        time: "20:00",
        url: null
    }
];

let activeFilter = FILTER_UPCOMING;

menuItemsClickListener();
calendarFilterClickListener();
renderCalendar();

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

function renderCalendar() {
    const eventsList = document.getElementById("events-list");
    if (!eventsList) {
        return;
    }

    const now = new Date();
    const sortedEvents = [...EVENTS].sort((a, b) => parseEventDate(a) - parseEventDate(b));
    const filteredEvents = sortedEvents.filter((event) => {
        const isPast = parseEventDate(event).getTime() < now.getTime();
        if (activeFilter === FILTER_PAST) {
            return isPast;
        }
        return !isPast;
    });

    if (filteredEvents.length === 0) {
        const emptyMessage = activeFilter === FILTER_PAST
            ? "Er zijn momenteel geen afgelopen evenementen."
            : "Er zijn momenteel geen aankomende evenementen.";
        eventsList.innerHTML = `<p class="calendar-empty">${emptyMessage}</p>`;
        return;
    }

    eventsList.innerHTML = filteredEvents
        .map((event) => {
            const eventDate = parseEventDate(event);
            const isPast = eventDate.getTime() < now.getTime();
            const statusLabel = isPast ? "Voorbij" : "Aankomend";
            const statusClass = isPast ? "event-status-past" : "event-status-upcoming";
            const hasUrl = typeof event.url === "string" && event.url.trim() !== "";
            const infoAction = hasUrl
                ? `<a class="event-link" href="${event.url}" target="_blank" rel="noopener noreferrer">Meer info</a>`
                : `<p class="event-info-pending">Meer info volgt binnenkort.</p>`;

            return `
                <article class="event-item ${isPast ? "event-item-past" : ""}">
                    <div class="event-item-header">
                        <h2>${event.title}</h2>
                        <span class="event-status ${statusClass}">${statusLabel}</span>
                    </div>
                    <p class="event-meta">${formatEventDate(eventDate)} om ${formatTime(event.time)}</p>
                    <p class="event-location">${event.location}</p>
                    <div class="event-actions">
                        ${infoAction}
                    </div>
                </article>
            `;
        })
        .join("");
}

function calendarFilterClickListener() {
    const filterButtons = document.querySelectorAll(".calendar-filter-btn");
    for (const button of filterButtons) {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter;
            updateActiveFilterButton(button);
            renderCalendar();
        });
    }
}

function updateActiveFilterButton(activeButton) {
    const filterButtons = document.querySelectorAll(".calendar-filter-btn");
    for (const button of filterButtons) {
        button.classList.toggle(ACTIVE_FILTER_CLASS, button === activeButton);
    }
}

function parseEventDate(event) {
    const [day, month, year] = event.date.split("/").map(Number);
    const [hours, minutes] = event.time.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function formatEventDate(date) {
    return new Intl.DateTimeFormat("nl-BE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(date);
}

function formatTime(time) {
    const [hours, minutes] = time.split(":");
    return `${hours}u${minutes}`;
}

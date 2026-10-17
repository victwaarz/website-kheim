# Inhoud van de website beheren

Handleiding voor de meest voorkomende aanpassingen aan de website van K.H. Eendracht Is Macht. Je hebt geen programmeerkennis nodig, maar wel een teksteditor (bv. VS Code) en toegang tot de GitHub-repository.

Na elke aanpassing:

1. Open `index.html` in je browser en controleer het resultaat.
2. Commit en push naar de `main`-branch. Na enkele minuten staat de wijziging online op <https://eendrachtismacht.be>.

---

## 1. Een evenement toevoegen aan de kalender

Open `script.js` en zoek de lijst `EVENTS` bovenaan. Voeg een nieuw blok toe (de volgorde maakt niet uit, de kalender sorteert zelf):

```js
const EVENTS = [
    // ... bestaande evenementen ...
    {
        title: "Kerstconcert",
        location: "Kerk Mechelen-Bovelingen",
        date: "19/12/2026",
        time: "19:30",
        url: null
    }
];
```

Let op:

- **`date`** schrijf je als `dd/mm/jjjj`, **`time`** als `uu:mm` (24-uursnotatie).
- **`url`** is de link naar meer info (meestal het Facebook-event). Nog geen link? Gebruik `null`; dan verschijnt "Meer info volgt binnenkort."
- Zet een **komma** tussen de blokken, en gebruik dubbele aanhalingstekens rond tekst.
- Een evenement verschuift automatisch naar *Afgelopen* zodra het startuur voorbij is. Oude evenementen hoef je dus niet te verwijderen.

## 2. De advertentie op de homepagina vervangen

De kaart op de homepagina staat in `index.html`, in het blok `<section class="home-card">` binnen `<div id="HOME">`. Pas daar aan:

| Wat | Element |
|---|---|
| Label bovenaan | `<p class="home-badge">Aankomend evenement</p>` |
| Titel en datum | `<h1 id="home-title">...</h1>` |
| Locatie | `<p class="home-location">...</p>` |
| Beschrijving | `<p class="home-description">...</p>` |
| Deadline inschrijving | de `<p>` direct onder de beschrijving |
| Knoppen | de twee `<a class="home-link ...">` in `home-actions` (inschrijvingsformulier en Facebook) |
| Betaalinfo | `<p class="home-payment">` met het rekeningnummer |

Niet elk evenement heeft een inschrijving of betaling nodig: verwijder dan gewoon de betreffende regels. Is er geen evenement om te promoten, dan kan je de volledige `<section class="home-card">` weghalen; het logo blijft dan alleen staan.

Vergeet niet het evenement ook in de kalender te zetten (zie 1).

## 3. De geschiedenis aanvullen

De geschiedenis staat op twee plaatsen:

- `history.md`: de brontekst in Markdown, handig om na te lezen of door te sturen.
- `index.html`: binnen `<div id="HISTORY">`. **Dit is wat op de site verschijnt.**

Pas altijd beide aan, zodat ze gelijk blijven.

Elke periode is een `<section>` met een titel en paragrafen:

```html
<section id="NIEUWE_PERIODE">
    <h2>Titel van de periode</h2>
    <p>
        Eerste alinea met een <span class="goldAndBold">naam in het goud</span>.
        <br><br>
        Tweede alinea.
    </p>
</section>
```

- Gebruik `<br><br>` voor een nieuwe alinea binnen hetzelfde tekstblok.
- Zet namen van dirigenten, voorzitters en verenigingen in `<span class="goldAndBold">...</span>`.
- Schrijf `&amp;` in plaats van `&`.

## 4. Een foto toevoegen

1. **Maak de foto kleiner** voordat je ze toevoegt: max. ±2000 pixels breed en liefst onder 500 kB. Grote foto's maken de site traag op gsm.
2. Zet het bestand in de map `assets/`, met een duidelijke naam zonder spaties, bv. `kerstconcert-2026.jpg`.
3. Voeg in `index.html` op de gewenste plaats in de geschiedenis toe:

```html
<figure>
    <img src="assets/kerstconcert-2026.jpg" alt="Korte beschrijving van de foto" loading="lazy" decoding="async">
    <figcaption>Onderschrift onder de foto</figcaption>
</figure>
```

Het `alt`-attribuut beschrijft de foto voor blinde bezoekers en zoekmachines. Vul het altijd in.

## 5. Contactgegevens wijzigen

Alles staat in `index.html`:

- Facebook- en Instagramlinks: `<div class="contact-links">`.
- Adres: `<div class="contact-address">`.
- Kaart: het `data-src`-attribuut van het `<iframe>` in `<div class="map-wrapper">`. Een nieuwe embedlink haal je via Google Maps → *Delen* → *Kaart insluiten*. Zet de link in `data-src` en **niet** in `src`, anders wordt de kaart geladen zonder toestemming van de bezoeker.
- E-mailadres: onderaan de privacyverklaring (`<div id="PRIVACY">`).

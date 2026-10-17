# Website K.H. Eendracht Is Macht Mechelen-Bovelingen

Officiële website van de **Koninklijke Harmonie Eendracht Is Macht** uit Mechelen-Bovelingen (Heers), opgericht in 1929.

- Live: <https://eendrachtismacht.be>
- Repository: `git@github.com:victwaarz/website-kheim.git`

De site is een eenvoudige statische one-page website: één HTML-bestand, één stylesheet en één JavaScript-bestand. Er is geen build-stap, geen framework en er zijn geen dependencies.

## Inhoud van de site

| Pagina | Element-id | Inhoud |
|---|---|---|
| Home | `HOME` | Logo en een "advertentie"-kaart voor het eerstvolgende grote evenement (inschrijvingslink, Facebook-event, rekeningnummer). |
| Geschiedenis | `HISTORY` | De geschiedenis van de harmonie sinds 1929, per dirigentperiode, met historische foto's. |
| Kalender | `CALENDAR` | Lijst met evenementen, filterbaar op *Aankomend* / *Afgelopen*. Wordt door JavaScript opgebouwd. |
| Contact | `CONTACT` | Links naar Facebook en Instagram, adres van het harmonielokaal en een Google Maps-kaart. |
| Privacy | `PRIVACY` | Privacyverklaring over embedded content van derden. |

Daarnaast zijn er een **cookiebanner** (onderaan, tot de bezoeker akkoord geeft) en een **footer** met een link naar de privacyverklaring.

## Projectstructuur

```
.
├── index.html     Alle pagina's (als <div>'s die getoond/verborgen worden)
├── styles.css     Volledige opmaak, inclusief mobiele weergave
├── script.js      Navigatie, kalender, cookie-toestemming, laadstatus van foto's
├── history.md     Brontekst van de geschiedenispagina (Markdown)
├── CNAME          Custom domein voor GitHub Pages
└── assets/        Logo, favicon en foto's
```

### `assets/`

| Bestand | Gebruik |
|---|---|
| `logo.png` | Logo op de homepagina |
| `icon.png` | Favicon |
| `background.jpg` | Achtergrond van de hele site én foto "Begin jaren 50" op de geschiedenispagina |
| `1976.jpg` | "Zwarte Lola in Mechelen-Bovelingen: 1976" |
| `1989-60-jaar.jpg` | 60-jarig bestaan in 1989 |
| `gala-1996.jpg` | Eerste galaconcert in 1996 |
| `lokaal-verbouwd.jpg` | Bouw van het nieuwe harmonielokaal (2024) |
| `gala-2026.jpg` | Galaconcert 2026 |

## Lokaal bekijken

Omdat alles statisch is, volstaat het om `index.html` in een browser te openen. Wil je het gedrag van een echte webserver (bv. voor `sessionStorage` of de Maps-embed), start dan een lokale server in de projectmap:

```bash
python3 -m http.server 8000
```

en surf naar <http://localhost:8000>.

## Publiceren

De site wordt gehost via **GitHub Pages** vanaf de `main`-branch. Het bestand `CNAME` koppelt het domein `eendrachtismacht.be` aan de Pages-site. Een push naar `main` is dus genoeg om de live site bij te werken (meestal binnen een paar minuten).

> Verwijder of wijzig `CNAME` niet, anders werkt het eigen domein niet meer.

## Technische werking

### Navigatie

Alle pagina's staan tegelijk in `index.html`; enkel de actieve pagina is zichtbaar. De andere hebben de klasse `hidden` (`display: none !important`).

- Menuknoppen en de footerlink hebben een attribuut `data-page="<ID>"`.
- `show(page)` in `script.js` verbergt alle pagina's uit de array `PAGES` en toont daarna de gekozen pagina.
- `setMenuItemActive()` zet de klasse `menu-item-active` op de juiste menuknop.

Er is geen URL-routing: de adresbalk verandert niet bij het wisselen van pagina. Na een refresh kom je altijd op Home terecht en je kan niet rechtstreeks naar bv. de kalender linken.

**Een nieuwe pagina toevoegen:**

1. Voeg in `index.html` een `<div id="NIEUW" class="... hidden">` toe binnen `<div class="page">`.
2. Voeg een menuknop toe: `<li><button type="button" class="menu-item" data-page="NIEUW">Titel</button></li>`.
3. Voeg in `script.js` een constante toe en zet ze in de array `PAGES`, anders wordt de pagina niet verborgen bij het wisselen.

### Kalender

De evenementen staan hardgecodeerd in de array `EVENTS` bovenaan `script.js`:

```js
{
    title: "Restaurantdag",
    location: "'t Paenhuys, Heers",
    date: "27/09/2026",   // dd/mm/jjjj
    time: "12:00",        // uu:mm
    url: "https://www.facebook.com/events/..."   // of null
}
```

`renderCalendar()` sorteert de evenementen chronologisch en bepaalt op basis van de huidige datum en het **startuur** of een evenement aankomend of voorbij is. Datums worden in het Nederlands (`nl-BE`) getoond, bv. "zondag 27 september 2026 om 12u00". Zonder `url` verschijnt "Meer info volgt binnenkort."

De velden worden zonder escaping in `innerHTML` gezet. Dat is geen probleem zolang de gegevens enkel in de code zelf staan, maar gebruik geen `<` of `>` in titels of locaties.

### Cookie-toestemming en embedded content

De Google Maps-kaart op de contactpagina wordt pas geladen nadat de bezoeker op **"Ik begrijp het"** klikt in de cookiebanner.

- Het iframe heeft geen `src`, maar een `data-src` en het attribuut `data-cookie-consent="required"`.
- Na akkoord kopieert `enableExternalEmbeds()` `data-src` naar `src` voor elk iframe met dat attribuut, en verbergt het de melding met `data-embed-blocked-message`.
- Het akkoord wordt bewaard in `sessionStorage` onder de sleutel `cookieConsentExternalEmbeds`. Het geldt dus enkel voor de huidige browsersessie: na het sluiten van de browser verschijnt de banner opnieuw.

Wil je later nog een embed toevoegen (bv. een YouTube-video), geef het iframe dan dezelfde attributen (`data-src` in plaats van `src`, `data-cookie-consent="required"` en de klasse `hidden`). Dan valt het automatisch onder dezelfde toestemming.

### Laadstatus van foto's

`initializeImageLoading()` geeft elke afbeelding die nog niet geladen is de klasse `image-loading` (vervaagd en doorschijnend) en zet op de omliggende `<figure>` de klasse `figure-loading`, die de tekst "Foto wordt geladen..." toont. Na het laden komt `image-loaded` in de plaats, bij een fout `image-failed`. De foto's op de geschiedenispagina gebruiken ook `loading="lazy"`.

### Opmaak

- Kleuren staan als CSS-variabelen in `:root` in `styles.css`: donkere achtergrond (`--dark`, `--dark-glass`), goud als accentkleur (`--gold`, `--gold-light`) en gebroken wit voor tekst (`--off-white`).
- Lettertypes via Google Fonts: **Playfair Display** voor titels, **Lato** voor tekst.
- De hulpklasse `goldAndBold` markeert namen en belangrijke gegevens in de tekst.
- Mobiele aanpassingen staan in één media query (`max-width: 520px`) onderaan `styles.css`.

## Inhoud bijwerken

Zie [docs/content-beheren.md](docs/content-beheren.md) voor een stap-voor-stap handleiding voor de meest voorkomende aanpassingen: een evenement toevoegen, de homepagina-advertentie vervangen, de geschiedenis aanvullen en foto's toevoegen.

## Aandachtspunten

- **Grote foto's**: verschillende foto's zijn erg groot (`gala-2026.jpg` ±15 MB, `background.jpg` ±9,7 MB, `1989-60-jaar.jpg` ±6,4 MB). Vooral `background.jpg` wordt op elke pagina geladen. Verkleinen naar max. ±2000 px breed en comprimeren (bv. naar JPEG-kwaliteit 80 of WebP) maakt de site op mobiel veel sneller.
- **Taal**: `<html lang="en">` staat op Engels terwijl de inhoud Nederlands is. Beter is `lang="nl"`, voor schermlezers en zoekmachines.
- **Homepagina-advertentie** staat hardgecodeerd in `index.html` en gaat niet automatisch weg als het evenement voorbij is. Vervang ze na elk evenement.
- **Privacyverklaring** vermeldt YouTube, maar op dit moment staat er geen YouTube-content op de site. Pas de tekst aan of voeg de video toe.
- **Tekst van de cookiebanner** zegt "door verder te surfen ga je akkoord", maar technisch wordt de externe content pas geladen na een klik op de knop.
- **`history.md` en `index.html`** bevatten dezelfde tekst. Bij een wijziging moeten beide bestanden aangepast worden; `history.md` wordt niet automatisch omgezet.
- **Geen deep links** naar subpagina's (zie [Navigatie](#navigatie)).

## Contact

- E-mail: <harmoniebovelingen@gmail.com>
- Facebook: <https://www.facebook.com/harmoniebovelingen>
- Instagram: <https://www.instagram.com/harmoniebovelingen>
- Adres harmonielokaal: Eendracht is Machtplein 1, 3870 Mechelen-Bovelingen

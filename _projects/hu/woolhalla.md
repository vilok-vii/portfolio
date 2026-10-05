---
title: Woolhalla
order: 2
summary: "Merülj el egy kézzel készített agyagvilágban, ahol minden agyagformázással és ötletes kézműves technikákkal készült. Egy legendás viking vagy, aki mestere a hajójavításnak. A tengerek minden tájáról érkeznek hozzád sérült hajók, és a te dolgod, hogy megjavítsd őket! Gyűjtsd össze az alapanyagokat, finomítsd őket izgalmas minijátékokban, és vessz el ebben a miniatűr világban!"
category: game-design
year: 2026
role: UI/UX-tervező
tools: ["Unreal Engine", "Figma", "Photoshop"]
responsibilities: ["UI vizuális identitás", "UI implementáció", "Core loop"]
skills: ["Figma", "Photoshop", "Unreal Engine"]
featured: true
image: /assets/images/woolhalla/cover.jpg
video: iODmqBy-M4w
wireframes:
  - src: /assets/images/woolhalla/wireframe-main-menu.webp
    caption: "Főmenü"
  - src: /assets/images/woolhalla/wireframe-options.webp
    caption: "A főmenüből megnyitott beállítások"
  - src: /assets/images/woolhalla/wireframe-hud.webp
    caption: "HUD"
  - src: /assets/images/woolhalla/wireframe-shed.webp
    caption: "Fészer-inventory"
  - src: /assets/images/woolhalla/wireframe-merchant.webp
    caption: "Kereskedő"
  - src: /assets/images/woolhalla/wireframe-sheep-sacrifice.png
    caption: "Birkaáldozat"
hud:
  - src: /assets/images/woolhalla/hud-1.webp
    caption: "1. A HUD elrendezésének wireframe-je: hajósérülések, a hajó hátralévő ideje, inventory és napciklus"
  - src: /assets/images/woolhalla/hud-2.webp
    caption: "2. Az első prototípus a motorban, helyőrző elemekkel"
  - src: /assets/images/woolhalla/hud-3.webp
    caption: "3. Agyag stílusú elemek és új elrendezés, az inventory alulra került"
  - src: /assets/images/woolhalla/hud-4.webp
    caption: "4. A végleges HUD a játékban"
menus:
  - src: /assets/images/woolhalla/menu-main.webp
    caption: "Főmenü"
  - src: /assets/images/woolhalla/menu-pause.webp
    caption: "Szünetmenü"
screens:
  - src: /assets/images/woolhalla/screen-shed.webp
    caption: "Fészer-inventory"
  - src: /assets/images/woolhalla/screen-merchant.webp
    caption: "Kereskedőképernyő"
  - src: /assets/images/woolhalla/screen-sheep-sacrifice.webp
    caption: "Birkaáldozat"
icons:
  - label: "Homokóra (hátralévő idő)"
    steps:
      - src: /assets/images/woolhalla/icon-hourglass-clay.webp
        alt: "Agyagból formázott homokóra"
      - src: /assets/images/woolhalla/icon-hourglass.webp
        alt: "A kiszínezett homokóra ikon a játékban"
  - label: "Hajó (hajósérülések)"
    steps:
      - src: /assets/images/woolhalla/icon-ship-clay.webp
        alt: "Agyagból formázott hajó"
      - src: /assets/images/woolhalla/icon-ship.webp
        alt: "A kiszínezett hajó ikon a játékban"
  - label: "Inventory slot"
    steps:
      - src: /assets/images/woolhalla/icon-slot-clay.webp
        alt: "Agyagból formázott inventory slot"
      - src: /assets/images/woolhalla/icon-slot.webp
        alt: "A kiszínezett inventory slot a játékban"
  - label: "Bezárás gomb"
    steps:
      - src: /assets/images/woolhalla/icon-close-clay-1.webp
        alt: "Agyaggolyó"
      - src: /assets/images/woolhalla/icon-close-clay-2.webp
        alt: "A laposra nyomott golyó"
      - src: /assets/images/woolhalla/icon-close.webp
        alt: "A piros bezárás gomb a játékban"
  - label: "Menügomb"
    steps:
      - src: /assets/images/woolhalla/icon-menu-button-clay-1.webp
        alt: "Agyaghenger"
      - src: /assets/images/woolhalla/icon-menu-button-clay-2.webp
        alt: "A laposra nyomott henger"
      - src: /assets/images/woolhalla/icon-menu-button.webp
        alt: "Az újrakezdés gomb a játékban"
assets:
  - label: "Csempézhető ablak-material: két material instance eltérő színekkel és méretekkel"
    steps:
      - src: /assets/images/woolhalla/asset-window-square.png
        alt: "Négyzetes ablak: sárga háttér, piros deszkák, kék szögek, 3 × 3 egység"
      - src: /assets/images/woolhalla/asset-window-wide.png
        alt: "Széles ablak: krémszínű háttér, lila deszkák, zöld szögek, 6 × 3 egység"
        no_arrow: true
  - label: "Szöveg-material: a szöveg előtte → utána, és a material node-gráfja"
    steps:
      - src: /assets/images/woolhalla/asset-text-before.webp
        alt: "Sima szöveg a material nélkül"
      - src: /assets/images/woolhalla/asset-text-after.webp
        alt: "Ugyanaz a szöveg az agyagszerű szöveg-materiallal"
      - src: /assets/images/woolhalla/asset-text-graph.webp
        alt: "A szöveg-material node-gráfja, a betűtípus signed distance fieldje alapján"
        no_arrow: true
palette: woolhalla
---

## Áttekintés

A legtöbb képernyő és UI-elem működésén dolgoztam, és az én feladatom volt, hogy vizuálisan egységbe hozzam őket. Szorosan együttműködtem a UI-artisttal, aki az asseteket készítette, én pedig beépítettem őket a motorba. Ezek közül néhányat testreszabható materiallá kellett alakítani, ez szintén az én feladatom volt. A UI-n kívül jelentősen hozzájárultam a core loop koncepciójához, valamint a blokk elején néhány kisebb dokumentációhoz.

## Core loop

Lent néhány vázlat látható. Az elsőt, amely a core loopot ábrázolja, én készítettem, hogy elmagyarázzam a csapattársaimnak az egyik ötletemet. Ez a vázlat lett a játékunk core loopjának alapja, a hangsúllyal azokon a mikrodöntéseken, amelyeket a játékos az állomások között futkosva hoz.

Az erőforrás-hurkok diagramja az összes tervező közös munkája. Egy lépéssel tovább megy, és azt vizsgálja, pontosan hogyan áramlanak az erőforrások ebben a core loopban.

<div class="gallery">
	<a href="{{ '/assets/images/woolhalla/core-loop-sketch.webp' | relative_url }}"><img src="{{ '/assets/images/woolhalla/core-loop-sketch.webp' | relative_url }}" alt="Core loop vázlat: a játékos a kikötő, a fészer, a műhely és a birkakarám között fut" loading="lazy"></a>
	<a href="{{ '/assets/images/woolhalla/resource-loops.png' | relative_url }}"><img src="{{ '/assets/images/woolhalla/resource-loops.png' | relative_url }}" alt="Erőforrás-hurkok diagram: a gyapjú, a birkák, a nyers és finomított anyagok és a hajók útja az állomások között" loading="lazy"></a>
</div>

## Dokumentáció és wireframe-ek

Mielőtt elkezdtem a képernyőket a motorban megvalósítani, készítettem néhány wireframe-vázlatot. Hasznosak voltak, hogy korán visszajelzést kapjak a csapattól. A megvalósítás során is ezekre támaszkodtam, és néhány esetben mások is ezeket használták, amikor képernyők prototípusát készítették (például a birkaáldozatot Halima).

Ezeket Figmában készítettem. Ez volt az első alkalom, hogy ezt a programot használtam.

{% include album.html items=page.wireframes %}

## HUD

A HUD-ot és a legtöbb elemét Unreal Engine-ben készítettem. Lent láthatók az iterációk a prototípustól a bemutatható változatig. Az elrendezés néhány csapattárs visszajelzése alapján változott.

{% include album.html items=page.hud %}

## Inventory

Egy több részből álló inventory-rendszert készítettem:

- **Játékoskomponens:** egy blueprint komponens a játékosnak, amely a játékos inventoryját kezeli. Az inventory UI és a fészer is ezt használja.
- **Fészer:** a fészer bármennyi, bármilyen erőforrást tárolhat. Egy blueprint, amelynek fizikai, interaktív eleme is van.
- **Kereskedő:** a rendszer egy jóval későbbi kiegészítése. A fészerhez hasonlóan működik.
- **Minijátékok:** egy minijáték sikeres teljesítése az alapanyagot a fejlettebb változatává alakítja.

Ez a rendszer kissé szétszórt lett; jó lett volna a projekt elején az egészet újraszervezni. Az adatot tároló UI-ok és játékbeli blueprintek is kissé szokatlanok, és rontják az átfogó architektúrát. Ennek ellenére jelentős hozzájárulás volt.

<div class="ph ph--pending">Inventory videó (hamarosan)</div>

## Menük

Én készítettem a főmenüt és a szünetmenüt, mindkettő működésével együtt, kivéve az egérérzékenységet. Nincs róluk sok mondanivaló, elég egyszerű menük. A szokásos iterációs folyamaton mentek keresztül, főleg vizuálisan. A vizuális részről lentebb írok bővebben.

{% include album.html items=page.menus ratio="16 / 9" %}

## Játékképernyők

A legtöbb UI-képernyőért én feleltem a motorban.

- **Fészer-inventory:** én készítettem a fészer-inventory elrendezését és működését. Amellett, hogy a játékos a slotokban lévő tárgyakra kattintva kezelheti az inventoryt, húzással is áthelyezheti őket.
- **Kereskedőképernyő:** az elrendezést én készítettem, a működést pedig főként én, néhány kisebb onboarding-korlátozással, amelyeket az onboarding-csapat adott hozzá.
- **Birkaáldozat:** a működést és az első elrendezést egy programozó készítette. Később én adtam hozzá az animációkat, a szám alapján változó birkát és a materialokat.

A többi képernyőt, például a megerősítő felugró ablakokat, mások készítették, később pedig én egységesítettem a stílusukat.

{% include album.html items=page.screens ratio="16 / 9" %}

## Minijátékok

Mindkét minijáték alapját mások készítették, de én adtam hozzá a materialokat, a visszajelzéseket, az animációt és a hangokat.

- **Varrás:** én adtam hozzá a forgó tűt, a cérnát (UI-ban ez nagyon trükkös: egy téglalap egy canvason) és a célpontok változó színeit, valamint az összhatást, például a háttér elsötétítését és az összes animációt.
- **Favágás:** a materialokat és animációikat adtam hozzá, a fent említett apróbb fejlesztésekkel együtt.

<div class="ph ph--pending">Minijáték-videók (hamarosan)</div>

## Ikonok

Néhány ikont valódi agyagból készítettem, és Photoshopban vagy Unreal Engine-ben, egy UI material segítségével színeztem ki.

{% include icons.html items=page.icons %}

## Egyéb assetek

- **Csempézhető, színben és méretben testreszabható háttér:** én készítettem a játék legtöbb ablakának hátterét, a UI-artist által készített 9×9-es textúra felhasználásával. Az UV-t úgy számolom ki, hogy a középső négyzetek csempézve ismétlődjenek. A szélesség és a magasság egységekben állítható, ahogy a színek is. A játék különböző ablakaihoz material instance-eket használunk.
- **Szöveg-material:** én készítettem a játékbeli szövegek materialját, hogy játékosabbak és agyagszerűbbek legyenek. A betűtípus distance field renderelést használ, ami az Unreal Engine 5.7 új funkciója!

{% include icons.html items=page.assets large=true %}

## Animáció és hang

Az egész játék UI-jához animációt és hangeffekteket adtam. Itt néhányat meg is nézhetsz és hallgathatsz. A játék többi hangját, például a zenét és az ambientet, más csapattagok építették be.

<div class="ph ph--pending">Animáció- és hangpéldák (hamarosan)</div>

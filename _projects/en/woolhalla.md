---
title: Woolhalla
order: 2
summary: "Immerse yourself in a handcrafted clay world, where everything is created through clayforming and ingenious handmade techniques. You are a legendary viking who is an expert at repairing ships. Boats from across the seas come to you with plenty of damage, and it is your job to fix 'em! Gather your materials, refine them through exciting minigames, and lose yourself in this miniature world!"
category: game-design
year: 2026
role: UI/UX designer
tools: ["Unreal Engine", "Figma", "Photoshop"]
responsibilities: ["UI visual identity", "UI implementation", "Core loop"]
skills: ["Figma", "Photoshop", "Unreal Engine"]
featured: true
image: /assets/images/woolhalla/cover.jpg
video: iODmqBy-M4w
play_url: https://buas.itch.io/woolhalla
wireframes:
  - src: /assets/images/woolhalla/wireframe-main-menu.webp
    caption: "Main menu"
  - src: /assets/images/woolhalla/wireframe-options.webp
    caption: "Options opened from the main menu"
  - src: /assets/images/woolhalla/wireframe-hud.webp
    caption: "HUD"
  - src: /assets/images/woolhalla/wireframe-shed.webp
    caption: "Shed inventory"
  - src: /assets/images/woolhalla/wireframe-merchant.webp
    caption: "Merchant"
  - src: /assets/images/woolhalla/wireframe-sheep-sacrifice.png
    caption: "Sheep sacrifice"
hud:
  - src: /assets/images/woolhalla/hud-1.webp
    caption: "1. Wireframe of the HUD layout: ship damages, ship time left, inventory and day cycle"
  - src: /assets/images/woolhalla/hud-2.webp
    caption: "2. First prototype in the engine, with placeholder elements"
  - src: /assets/images/woolhalla/hud-3.webp
    caption: "3. Clay-styled elements and a new layout, with the inventory moved to the bottom"
  - src: /assets/images/woolhalla/hud-4.webp
    caption: "4. The final HUD in the game"
menus:
  - src: /assets/images/woolhalla/menu-main.webp
    caption: "Main menu"
  - src: /assets/images/woolhalla/menu-pause.webp
    caption: "Pause menu"
screens:
  - src: /assets/images/woolhalla/screen-shed.webp
    caption: "Shed inventory"
  - src: /assets/images/woolhalla/screen-merchant.webp
    caption: "Merchant screen"
  - src: /assets/images/woolhalla/screen-sheep-sacrifice.webp
    caption: "Sheep sacrifice"
icons:
  - label: "Hourglass (time left)"
    steps:
      - src: /assets/images/woolhalla/icon-hourglass-clay.webp
        alt: "Hourglass shaped from clay"
      - src: /assets/images/woolhalla/icon-hourglass.webp
        alt: "Coloured hourglass icon in the game"
  - label: "Ship (ship damages)"
    steps:
      - src: /assets/images/woolhalla/icon-ship-clay.webp
        alt: "Ship shaped from clay"
      - src: /assets/images/woolhalla/icon-ship.webp
        alt: "Coloured ship icon in the game"
  - label: "Inventory slot"
    steps:
      - src: /assets/images/woolhalla/icon-slot-clay.webp
        alt: "Inventory slot shaped from clay"
      - src: /assets/images/woolhalla/icon-slot.webp
        alt: "Coloured inventory slot in the game"
  - label: "Close button"
    steps:
      - src: /assets/images/woolhalla/icon-close-clay-1.webp
        alt: "Ball of clay"
      - src: /assets/images/woolhalla/icon-close-clay-2.webp
        alt: "The ball pressed flat"
      - src: /assets/images/woolhalla/icon-close.webp
        alt: "Red close button in the game"
  - label: "Menu button"
    steps:
      - src: /assets/images/woolhalla/icon-menu-button-clay-1.webp
        alt: "Bar of clay"
      - src: /assets/images/woolhalla/icon-menu-button-clay-2.webp
        alt: "The bar pressed flat"
      - src: /assets/images/woolhalla/icon-menu-button.webp
        alt: "Restart button in the game"
assets:
  - label: "Tileable window material: two material instances with different colours and sizes"
    steps:
      - src: /assets/images/woolhalla/asset-window-square.png
        alt: "Square window instance: yellow background, red boards, blue nails, 3 × 3 units"
      - src: /assets/images/woolhalla/asset-window-wide.png
        alt: "Wide window instance: cream background, purple boards, green nails, 6 × 3 units"
        no_arrow: true
  - label: "Text material: the text before → after, and the material's node graph"
    steps:
      - src: /assets/images/woolhalla/asset-text-before.webp
        alt: "Plain text without the material"
      - src: /assets/images/woolhalla/asset-text-after.webp
        alt: "The same text with the clay-like text material"
      - src: /assets/images/woolhalla/asset-text-graph.webp
        alt: "The text material's node graph, based on the font's signed distance field"
        no_arrow: true
palette: woolhalla
---

## Overview

I worked on the functionality of most screens and UI elements, and I was responsible for bringing them together visually. I worked closely with the UI artist, who made the assets that I implemented in the engine. Some of these assets had to be turned into customizable materials, which was also my task. Besides the UI, I contributed heavily to the concept of the core loop and to some smaller documentation at the beginning of the block.

## Core loop

Below you can find some sketches. I made the first one, which depicts the core loop, to explain a concept I had in mind to my teammates. This sketch became the basis of our game's core loop, with the focus on the micro decisions the player makes while running around between the stations.

The resource loops diagram was a joint effort of all designers. It goes a step further and explores the exact flow of resources within this core loop.

<div class="gallery">
	<a href="{{ '/assets/images/woolhalla/core-loop-sketch.webp' | relative_url }}"><img src="{{ '/assets/images/woolhalla/core-loop-sketch.webp' | relative_url }}" alt="Core loop sketch: the player runs between the docks, the shed, the workstation and the sheep pen" loading="lazy"></a>
	<a href="{{ '/assets/images/woolhalla/resource-loops.png' | relative_url }}"><img src="{{ '/assets/images/woolhalla/resource-loops.png' | relative_url }}" alt="Resource loops diagram: how wool, sheep, raw and refined materials and boats flow between the stations" loading="lazy"></a>
</div>

## Documentation and wireframes

I made some wireframe sketches before I started implementing the screens in the engine. They were useful for getting early feedback from the team. I referred to them during implementation, and in some cases other people used them when they were implementing prototypes of screens (such as the sheep sacrifice by Halima).

I made these in Figma. This was my first time using the software.

{% include album.html items=page.wireframes %}

## HUD

I made the HUD and most of its elements in Unreal Engine. Below you can see the iterations from prototype to presentable. The layout was changed based on feedback I got from some team members.

{% include album.html items=page.hud %}

## Inventory

I made an inventory system that consists of multiple parts:

- **Player component:** a blueprint component for the player that handles the player's inventory. It is accessed by the inventory UI as well as the shed.
- **Shed:** the shed can hold unlimited resources of any kind. It is a blueprint that also has a physical, interactable element.
- **Merchant:** a much later addition to the system. It works similarly to the shed.
- **Minigames:** completing a minigame successfully converts a material into its upgraded version.

This system is a bit all over the place; it would have been nice to restructure the whole thing early in the project. UIs and in-game blueprints holding data are both a bit unconventional and hurt the overall architecture. It was a substantial contribution, however.

{% include youtube.html id="tT2BzW_f00A" title="Woolhalla inventory prototype" %}

## Menus

I created the main menu and the pause menu, including the functionality of both, except for the mouse sensitivity. There's not much to say about them; they are fairly straightforward menus. They went through the usual iteration process, mostly visual. I talk more about the visuals further down.

{% include album.html items=page.menus ratio="16 / 9" %}

## Game screens

I was responsible for most UI screens in the engine.

- **Shed inventory:** I made the shed inventory's layout and functionality. Besides managing the inventory by clicking on the items in their slots, the player can also drag and drop them.
- **Merchant screen:** I made the layout, and the functionality was done primarily by me, with some slight onboarding limitations added by the onboarding team.
- **Sheep sacrifice:** the functionality and the initial layout were done by a programmer. I later added the animations, the sheep changing based on the number, and the materials.

Other screens, such as confirmation pop-ups, were made by other people and later unified in style by me.

{% include album.html items=page.screens ratio="16 / 9" %}

## Minigames

The base of both minigames was built by others, but I added the materials, their feedback, animation and sounds.

- **Sewing:** I added the rotating needle, the string (super tricky to do in UI: it's a rectangle on a canvas) and the changing colours of the target points, as well as the overall look, like the darkening of the background and all animations.
- **Woodchopping:** I added the materials and their animations, along with the same small improvements mentioned above.

<div class="video-pair">
{% include youtube.html id="7VaWAh4If4U" title="Woolhalla sewing minigame" caption="Sewing" %}
{% include youtube.html id="0vEnKHWswAE" title="Woolhalla woodchopping minigame" caption="Woodchopping" %}
</div>

## Icons

I made some icons from actual clay and coloured them in Photoshop, or in Unreal Engine using a UI material.

{% include icons.html items=page.icons %}

## Other assets

- **Tileable overlay with customizable colours and size:** I made the background for most windows in the game, using the 9×9 texture the UI artist made. I calculate the UV so that the middle squares tile. The width and height are customizable in units, as are the colours. We use material instances for the different windows in the game.
- **Text material:** I made the material for the texts in the game to make them more playful and clay-like. It uses distance field rendering in the font, which is a new Unreal Engine 5.7 feature!

{% include icons.html items=page.assets large=true %}

## Animation and sound

I added animation and sound effects to the whole UI in the game. Here you can see and listen to some of them. The other game sounds, like the music and the ambience, were implemented by other team members.

{% include youtube.html id="RwTv7cHLxk4" title="Woolhalla UI showcase with animation and sound" %}

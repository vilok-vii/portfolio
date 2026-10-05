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
wireframes:
  - src: /assets/images/woolhalla/wireframe-main-menu.webp
    caption: "Main menu"
  - src: /assets/images/woolhalla/wireframe-options.webp
    caption: "Options opened from the main menu"
  - src: /assets/images/woolhalla/wireframe-hud.webp
    caption: "HUD"
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

<div class="ph ph--pending">HUD iterations (images coming)</div>

## Inventory

I made an inventory system that consists of multiple parts:

- **Player component:** a blueprint component for the player that handles the player's inventory. It is accessed by the inventory UI as well as the shed.
- **Shed:** the shed can hold unlimited resources of any kind. It is a blueprint that also has a physical, interactable element.
- **Merchant:** a much later addition to the system. It works similarly to the shed.
- **Minigames:** completing a minigame successfully converts a material into its upgraded version.

This system is a bit all over the place; it would have been nice to restructure the whole thing early in the project. UIs and in-game blueprints holding data are both a bit unconventional and hurt the overall architecture. It was a substantial contribution, however.

<div class="ph ph--pending">Inventory video (coming)</div>

## Menus

I created the main menu and the pause menu, including the functionality of both, except for the mouse sensitivity. There's not much to say about them; they are fairly straightforward menus. They went through the usual iteration process, mostly visual. I talk more about the visuals further down.

<div class="ph ph--pending">Menu images (coming)</div>

## Game screens

I was responsible for most UI screens in the engine.

- **Shed inventory:** I made the shed inventory's layout and functionality. Besides managing the inventory by clicking on the items in their slots, the player can also drag and drop them.
- **Merchant screen:** I made the layout, and the functionality was done primarily by me, with some slight onboarding limitations added by the onboarding team.
- **Sheep sacrifice:** the functionality and the initial layout were done by a programmer. I later added the animations, the sheep changing based on the number, and the materials.

Other screens, such as confirmation pop-ups, were made by other people and later unified in style by me.

<div class="ph ph--pending">Game screen images (coming)</div>

## Minigames

The base of both minigames was built by others, but I added the materials, their feedback, animation and sounds.

- **Sewing:** I added the rotating needle, the string (super tricky to do in UI: it's a rectangle on a canvas) and the changing colours of the target points, as well as the overall look, like the darkening of the background and all animations.
- **Woodchopping:** I added the materials and their animations, along with the same small improvements mentioned above.

<div class="ph ph--pending">Minigame videos (coming)</div>

## Icons

I made some icons from actual clay and coloured them in Photoshop, or in Unreal Engine using a UI material.

<div class="ph ph--pending">Icon images (coming)</div>

## Animation and sound

I added animation and sound effects to the whole UI in the game. Here you can see and listen to some of them. The other game sounds, like the music and the ambience, were implemented by other team members.

<div class="ph ph--pending">Animation and sound examples (coming)</div>

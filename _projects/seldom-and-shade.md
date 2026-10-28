---
title: Seldom & Shade
order: 1
summary: "Seldom & Shade is an arcade twin-stick action game where you play as Seldom, the ghost, and his dog, Shade, at the same time, with one joystick each. You navigate a nightmarish field, evading and destroying enemies by luring them into the ethereally strong bond between the two characters (the 'leash'). But beware! Some of your foes have the means to cut this bond!"
category: game-design
year: 2025
role: Solo developer
tools: ["Unreal Engine", "Miro"]
responsibilities: ["Moment-to-moment gameplay", "3Cs", "Player feedback and UX", "Playtesting"]
skills: ["Design documentation", "Planning and testing", "Technical design", "Unreal Engine"]
featured: true
image: /assets/images/seldom-and-shade/screenshot-3.webp
thumbnail: /assets/images/seldom-and-shade/card.webp
video: 7bEQdVEKjgE
screenshots:
  - src: /assets/images/seldom-and-shade/screenshot-1.webp
    caption: "Seldom and Shade connected by a glowing blue leash, with an enemy nearby"
  - src: /assets/images/seldom-and-shade/screenshot-2.webp
    caption: "Seldom surrounded by red enemies, with arrows at the screen edge pointing to off-screen enemies"
  - src: /assets/images/seldom-and-shade/screenshot-3.webp
    caption: "The leash stretched between Seldom and Shade during a 13x combo"
  - src: /assets/images/seldom-and-shade/screenshot-4.webp
    caption: "End screen with the score breakdown and the leaderboard"
design_docs:
  - src: /assets/images/seldom-and-shade/high-concept.png
    caption: Design high concept
  - src: /assets/images/seldom-and-shade/controller-layout.png
    caption: Controller layout
  - src: /assets/images/seldom-and-shade/core-loop.png
    caption: Core loop
  - src: /assets/images/seldom-and-shade/onion-model.png
    caption: Onion model
  - src: /assets/images/seldom-and-shade/collision-matrix.png
    caption: Collision matrix
  - src: /assets/images/seldom-and-shade/spec-seldom.png
    caption: "Feature spec: Seldom"
  - src: /assets/images/seldom-and-shade/spec-shade.png
    caption: "Feature spec: Shade"
  - src: /assets/images/seldom-and-shade/spec-leash.png
    caption: "Feature spec: Leash"
  - src: /assets/images/seldom-and-shade/spec-score.png
    caption: "Feature spec: Score"
  - src: /assets/images/seldom-and-shade/spec-enemies.png
    caption: "Feature spec: Enemies"
  - src: /assets/images/seldom-and-shade/spec-multiplier-pickup.png
    caption: "Feature spec: Multiplier pickup"
  - src: /assets/images/seldom-and-shade/spec-essence-of-shade.png
    caption: "Feature spec: Essence of Shade"
  - src: /assets/images/seldom-and-shade/spec-spawning-shade.png
    caption: "Feature spec: Spawning Shade (with explosion)"
  - src: /assets/images/seldom-and-shade/spec-pulling-shade.png
    caption: "Feature spec: Pulling Shade"
  - src: /assets/images/seldom-and-shade/spec-score-calculation.png
    caption: "Feature spec: Score calculation"
  - src: /assets/images/seldom-and-shade/spec-direction-indicators.png
    caption: "Feature spec: Direction indicators"
playtests:
  - src: /assets/images/seldom-and-shade/playtest-1.png
    caption: "Playtest 1"
  - src: /assets/images/seldom-and-shade/playtest-2.png
    caption: "Playtest 2"
progress:
  - title: Template and leash
    text: "I started from a twin-stick shooter template provided by the teaching staff. Since the player controls two characters at once, I reworked the movement so that each joystick drives one character. I then removed the template's gun system and replaced it with my own weapon: the leash that connects the two characters."
    video:
      src: /assets/images/seldom-and-shade/progress-1.mp4
      poster: /assets/images/seldom-and-shade/progress-1-poster.jpg
      caption: "The greybox on the template's level, with the first leash and placeholder enemies"
  - title: Textures and effects
    text: "Next, I added grungy textures and visual effects. Besides setting the mood, they make the important objects on screen, such as the characters, the leash and the enemies, stand out clearly against the background."
    video:
      src: /assets/images/seldom-and-shade/progress-2.mp4
      poster: /assets/images/seldom-and-shade/progress-2-poster.jpg
      caption: "Grungy ground textures and the crackling leash effect"
  - title: Health feedback and danger
    text: "Seldom can take two hits within a certain time window before going down. I added visual feedback that tells players when they are down to their last health. I also coloured everything that can cut the leash bright red and gave the enemies spiky shapes, so that danger reads at a glance."
    video:
      src: /assets/images/seldom-and-shade/progress-3.mp4
      poster: /assets/images/seldom-and-shade/progress-3-poster.jpg
      caption: "Spiky red enemies and bright red obstacles that cut the leash"
  - title: HUD and multiplier
    text: "I added a simple HUD that shows the game mode's information to the player. To keep players moving around the level, I introduced a yellow multiplier pickup that helps them reach a higher score. I also changed the walls from red to grey: they do not damage the player and only cut the leash, so they should not look as threatening as the enemies."
    video:
      src: /assets/images/seldom-and-shade/progress-4.mp4
      poster: /assets/images/seldom-and-shade/progress-4-poster.jpg
      caption: "The new HUD and grey stone walls, with the multiplier climbing"
  - title: Final polish
    text: "Finally, I added a cooldown bar under the multiplier to show when the collected points will be added to the total score. I toned down the brightness of the leash so that the characters' damaged state stands out better. I also added direction indicators at the edge of the screen for all enemies and the multiplier, which made players less afraid of approaching the edge."
    video:
      src: /assets/images/seldom-and-shade/progress-5.mp4
      poster: /assets/images/seldom-and-shade/progress-5-poster.jpg
      caption: "Collecting multiplier pickups, with the cooldown bar under the multiplier"
---

## Overview

I made this game for Block A of Year 2 during my studies at Breda University of Applied Sciences. As I was specialising in technical design, my task was to build on top of a twin-stick shooter template. I wanted to make something unique, with a clean and simple design, so I settled on a game where the player controls two characters at the same time, one with each joystick.

Surprisingly, the unconventional controls did not turn out to be as jarring as I had anticipated, and the game turned out to be exactly what an arcade game should be: people were excited to play, kept jumping back in to reach a new high score, and had fun in the meantime.

{% include album.html items=page.screenshots ratio="16 / 9" %}

## Technical design

Placeholder: the idea behind the push-and-pull playstyle.

Seldom & Shade was later chosen as one of the example games for the next year's students.

## Development progress

The game went through several versions during the block, from a greybox on the template's level to the final look.

{% include steps.html items=page.progress %}

## Unreal Engine

The game was made in Unreal Engine 5. Placeholder: what you changed and added compared to the twin-stick shooter template.

## Design documentation

Using a given template, I documented the game's high concept, then created individual feature specs for every feature I made. Here you can see the filled-out pitch template, the core loop and a few feature specs.

{% include album.html items=page.design_docs %}

## Planning and testing

- Every week I kept a conditions of satisfaction document alongside the design and implementation work.
- I also kept a weekly reflection log on my process.
- I ran playtests throughout the project.

For example, players played defensively, as opposed to my intention. When they stretched the leash, their characters ended up too close to the edge of the screen, where an enemy could kill them unexpectedly. My solution was to add arrows on the edge of the screen that indicate nearby off-screen enemies.

{% include album.html items=page.playtests ratio="4 / 3" %}

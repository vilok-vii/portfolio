---
title: Seldom & Shade
order: 1
summary: "A Seldom & Shade egy arcade twin-stick akciójáték, amelyben egyszerre irányítod Seldomot, a szellemet, és kutyáját, Shade-et, mindkettőt egy-egy joystickkal. Egy lidérces mezőn haladsz, kikerülöd és elpusztítod az ellenségeket úgy, hogy a két karakter közötti, földöntúlian erős kötelékbe (a „pórázba”) csalogatod őket. De vigyázz! Néhány ellenfeled képes elvágni ezt a köteléket!"
category: tech-design
year: 2025
role: Egyéni fejlesztő
tools: ["Unreal Engine", "Miro"]
responsibilities: ["Moment-to-moment játékmenet", "3C (karakter, kamera, irányítás)", "Visszajelzés a játékosnak és UX", "Játéktesztelés"]
skills: ["Tervezési dokumentáció", "Tervezés és tesztelés", "Technikai tervezés", "Unreal Engine"]
featured: true
image: /assets/images/seldom-and-shade/screenshot-3.webp
video: 7bEQdVEKjgE
palette: seldom-and-shade
theme_default: dark
---

## Áttekintés

Ezt a játékot a második év A blokkjára készítettem a Breda University of Applied Sciences tanulmányaim során. Mivel technikai tervezésre szakosodtam, a feladatom egy twin-stick shooter sablonra való építkezés volt. Valami egyedit szerettem volna, letisztult és egyszerű designnal, ezért egy olyan játék mellett döntöttem, amelyben a játékos egyszerre két karaktert irányít, mindkettőt egy-egy joystickkal.

Meglepő módon a szokatlan irányítás egyáltalán nem lett olyan zavaró, mint amire számítottam, és a játék pontosan olyan lett, amilyennek egy arcade játéknak lennie kell: az emberek lelkesen játszottak, újra és újra visszaültek, hogy új rekordot döntsenek, és közben jól szórakoztak.

<div class="gallery gallery--grid">
	<a href="{{ '/assets/images/seldom-and-shade/screenshot-1.webp' | relative_url }}"><img src="{{ '/assets/images/seldom-and-shade/screenshot-1.webp' | relative_url }}" alt="Seldom és Shade, akiket egy világító kék póráz köt össze, a közelben egy ellenséggel" loading="lazy"></a>
	<a href="{{ '/assets/images/seldom-and-shade/screenshot-2.webp' | relative_url }}"><img src="{{ '/assets/images/seldom-and-shade/screenshot-2.webp' | relative_url }}" alt="Seldom piros ellenségek gyűrűjében, a képernyő szélén nyilak mutatják a képen kívüli ellenségeket" loading="lazy"></a>
	<a href="{{ '/assets/images/seldom-and-shade/screenshot-3.webp' | relative_url }}"><img src="{{ '/assets/images/seldom-and-shade/screenshot-3.webp' | relative_url }}" alt="A Seldom és Shade között kifeszített póráz egy 13-szoros kombó közben" loading="lazy"></a>
	<a href="{{ '/assets/images/seldom-and-shade/screenshot-4.webp' | relative_url }}"><img src="{{ '/assets/images/seldom-and-shade/screenshot-4.webp' | relative_url }}" alt="Záróképernyő a pontszám részleteivel és a ranglistával" loading="lazy"></a>
</div>

## Tervezési dokumentáció

Egy megadott sablon alapján dokumentáltam a játék alapkoncepcióját, majd minden elkészített funkcióhoz külön funkcióleírást írtam. Itt látható a kitöltött pitch sablon, a core loop és néhány funkcióleírás.

<div class="gallery">
	<div class="ph">Pitch sablon</div>
	<div class="ph">Core loop</div>
	<div class="ph">Funkcióleírás</div>
</div>

## Tervezés és tesztelés

- Minden héten vezettem egy „conditions of satisfaction” dokumentumot a tervezési és fejlesztési munka mellett.
- Heti reflexiós naplót is vezettem a folyamatomról.
- A projekt során játékteszteket tartottam.

Például a játékosok a szándékommal ellentétben védekezően játszottak. Amikor kifeszítették a pórázt, a karaktereik túl közel kerültek a képernyő széléhez, ahol egy ellenség váratlanul megölhette őket. Megoldásként a képernyő szélére nyilakat tettem, amelyek a közeli, képen kívüli ellenségeket jelzik.

## Technikai tervezés

Helyőrző: a „push and pull” játékstílus mögötti gondolat.

A Seldom & Shade-et később a következő évfolyam egyik példajátékának választották.

## Unreal Engine

A játék Unreal Engine 5-ben készült. Helyőrző: mit változtattál és mit adtál hozzá a twin-stick shooter sablonhoz képest.

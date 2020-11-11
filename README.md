# Tap Titans 2 Macro Generator

_**RUNNING A MACRO CAN BE DANGEROUS**_

This macro does not intentionally deal with the store tab, but crazy shit happens.

This macro ACTIVELY AVOIDS tapping on equipment (which can cause a "Buy Set" button to appear, costing you gems), but __CRAZY SHIT HAPPENS__.

This script assumes several things:
1. You have BlueStacks installed and setup (Tutorial coming later)
1. You're running a Clan Ship + Fairy build
1. You've somehow do not have to watch ads for Fairy drops
1. You have 5 Daggers
1. DS and WC both have ~2min duration

## Initialize

Should be run immediately after a prestige. It will:

- Ensure your panels are set to full height
- Ensure your heroes are set to max buy
- Open your character panel
- Upgrade your Sword Master to unlock your skills
- Buy the four skills relevant to Clan Ship (DS, HoM, WC, SC)
- Open your Heroes panel
- Scroll to the top and buy a page of heroes (if possible)
- Go absolutely nutso (60 seconds)
- Open your Heroes panel
- Scroll to the second "Page" of heroes, buy, scroll up, buy again

## Absolutely Nutso mode

During initialization and for about 20 minutes after, the macro will run "Manic" mode. This means it will loop through:

1. Activate all skills
1. Tap Crewmate
1. Tap Pet
1. Tap every\* potential spawn/jump point of Astral Awakening twice
1. Tap all 5 dagger locations

It'll basically look like your screen is exploding for about 55s, then it will open the Hero panel, activate/upgrae your heroes, and do it again.

This will last around 20 minutes, at which point...

## Mid-game mode

To transition to midgame mode, the macro will

1. Open your Character panel
1. Upgrade your sword master (why not)
1. Cancel DS (if running), and then upgrade and max it out

Afterward, it will do a more controlled loop, where:
1. Activate HoM, WC, and SC
1. Alternate between tapping the line the fairies travel and the "Continue" button location
1. Activate DS if the fairies didn't
1. Open your Hero panel/activate/upgrade
1. For 60 seconds
  1. Activate HoM, WC, SC
  1. Tap Crewmate
  1. Tap Pet
  1. Tap every\* potential spawn/jump point of Astral Awakening twice
  1. Tap all 5 dagger locations (with a 1s delay between each)
1. Open your Hero panel/activate/upgrade
1. For 45 seconds
  1. Activate HoM, WC, SC
  1. Tap Crewmate
  1. Tap Pet
  1. Tap SAFE potential spawn/jump point of Astral Awakening twice
  1. Tap all 5 dagger locations (with a 1s delay between each)

After 3 rounds, the macro waits for 90s. This is to allow for it failing to kill a boss in time and ending up out of battle. It will then tap the location of "Enter Battle" and start the final round...

> SAFE is defined as any points BELOW the fairy line

## Late-game Mode

I know you were hoping for exciting stuff, but it's the same as mid-game, except we max out WC and only keep HoM and SC up during the loop ¯\_(ツ)_/¯


* \*Every potential spawn of Astral Awakening.... EXCEPT those near the equipment drop!

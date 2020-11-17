# Tap Titans 2 Macro Generator


_** WARNING **_
_**RUNNING A MACRO CAN BE DANGEROUS**_

These macros do not intentionally deal with the store tab, but crazy shit happens.

These macros ACTIVELY AVOID tapping on equipment and the "Buy Set" button, but __CRAZY SHIT HAPPENS__.

# How-to

Because of the 30min restriction on BlueStacks macros, I've split the Clan Ship/Fairy macros into pieces. The idea is
that you'd import all of them into Blue Stacks, then use the "Merge" button in the macro interface. In here, you'd add
the macros to the list like this:

1. Initialize
1. Attack Loop (5-10 loops, or until progress usually slows without upgrading)
1. Max Deadly Strike
1. Attack Loop (1-3 loops, basically cheap filler just to help the mana strain)
1. Max War Cry
1. Attack Loop (2-5 loops, until progress usually slows or stops)
1. Prestige
1. Optional: BoS Max Upgrade

Then start the resulting merged-macro after a prestige.

# Pieces and Assumptions

`tt2_generator.js` is a NodeJS tool that exports 7 "Standard" Macros and 9 "Raid" Macros. Details below.

This script assumes several things:
1. You have BlueStacks installed and setup (Tutorial coming later)
1. You're running a Clan Ship + Fairy build
1. You have MAXed out Fairy Charm
1. You have 5 Daggers
1. You've somehow do not have to watch ads for Fairy drops (event pass, lifetime ad-free, VIP, etc.)

## Initialize

- Ensure your panels are set to full height
- Ensure your heroes are set to max buy
- Open your character panel
- Upgrade your Sword Master to unlock your skills
- Buy the four skills relevant to Clan Ship (DS, HoM, WC, SC)
- Open your Heroes panel
- 60 seconds of Attack Loop (See below)
- Open your Heroes panel
- Scroll to the second "Page" of heroes, buy, scroll up, buy again

## Attack Loop

1. Activate all skills
1. Tap Crewmate
1. Tap Pet
1. Tap every\* potential spawn/jump point of Astral Awakening twice
1. Tap a dagger, activate skills, repeat for each dagger
1. Run "Ensure Closed" process

> \*Every potential spawn of Astral Awakening.... EXCEPT those near the equipment drop. The ones around the "Buy Set"
> button are actually safely clickable - just needed to get creative

The loop will run for nearly 2 minutes, and finish with 1 page of hero activation/upgrades.

> To help mitigate lock ups due to the frequent level transition, the macro will:
> 1. Tap the Hero panel twice quickly
> 1. Tap the Hero panel once normally
> 1. Tap the pet panel twice normally
> 1. Tap where the fairy's "Continue" button is
>
> These taps should force any open windows/messages to close, flip to the Hero panel from whatever panel was showing,
> then open/close the Pet panel. So, if you see panels opening/closing.... you know why

## Max DS & Max WC

Will bring Deadly Strike/War Cry as high as it can go by:

1. Opening Hero panel
1. Level up Hero (or he/she will be sad)
1. Tap the main level-up button for skill (might upgrade, more likely it will cancel the currently activated skill)
1. Tap the main level-up button again (definitely upgrade)
1. Tap the blue Max button to the left.
1. Run "Ensure Closed" process

## Break for Boss

Considering removing this as I haven't "missed" a boss kill with this new method, but saving it for now. Just chills for 90s.

## Prestige

Surprisingly, this is currently the macro that is the most likely to fail on you; the second and third prestige buttons
seem to shift up/down based on the content of the windows. I haven't gotten the layout quite right yet 100% of the time,
so let me know if it fails on you.

1. Open Hero panel
1. Tap Prestige button
1. Wait a few seconds
1. Tap Prestige button on pop-up
1. Wait a few seconds (slow and steady, folks....)
1. Tap the last Prestige button
1. Wait ~10 seconds
1. Tap where the "Max Equipment Drops" warning might show up

## BoS Max Upgrade

WARNING: Macros can't see. If you recently unlocked a new artifact and it's still at the top of the list, this macro
WILL UPGRADE THAT INSTEAD. Probably not what you want; so restart the game or prestige without this macro then restart

1. Open the Artifact panel
1. Tap the top-most artifact (directly under the "Discover" button) 6 times.
1. Close the panel
1. Run "Ensure Closed" process

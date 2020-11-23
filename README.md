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
1. You're running a Clan Ship build
1. You have MAXed out Fairy Charm
1. You have 5 Daggers
1. You've somehow do not have to watch ads for Fairy drops (event pass, lifetime ad-free, VIP, etc.)
1. You have Artifact upgrade set to percentage

## Initialize

This script will automatically:

- Ensure your panels are set to full height
- Ensure your heroes are set to max buy
- Ensure your pets page is scrolled to the bottom
- Open your character panel
- Upgrade your Sword Master to unlock your skills
- Buy the four skills relevant to Clan Ship (DS, HoM, WC, SC)
- 60 seconds of Attack Loop (See below)
- Open your Heroes panel
- Scroll to the second "Page" of heroes, buy, scroll up, buy again

## Attack Loop

This is the most complicated script in the bunch. The goal is two-fold:

1. Utilize Daggers, Ancestral Awakening, Clan Ship Crewmate, all appropriate Sword Master skills, and Heart of Midas
1. Mitigate script lockups due to level transition/fairy drops/bad coding

Neither of these is straight-forward, but the attacks are easier to explain:

For every dagger:
1. Activate all skills
1. Tap every\* potential spawn/jump point of Astral Awakening
1. Tap a dagger
1. Tap Crewmate

This cycle lasts ~20 seconds and is followed by a tap on your pet (for HeoM) and then the "Ensure Closed" macro. With 5 iterations, you're highly likely to use most of the daggers before their expiration and with enough time between them to use the minimum per titan, and also likely to hit the Astral Awakening trigger to its full advantage. This method also keeps your crewmate and skills up as much as possible.

> \*Every potential spawn of Astral Awakening.... EXCEPT those near the equipment drop. The ones around the "Buy Set"
> button are actually safely clickable - just needed to get creative

### Ensure Closed

Attempt to ensure that all panels, messages, information boxes, etc. are closed. Originally, the script attempted to minimize all panel interactions, hoping to avoid the screen transition. It turns out that doesn't work, so this attempts the opposite: accept that the screen transition is going to happen at the worst time every time, and try to recover quickly afterward.

This is accomplished by:

1. Tap the Hero panel twice quickly
1. Tap the Hero panel once normally
1. Tap the pet panel to open it
1. Tap the bottom-right-most pet
1. Tap the pet panel to close it
1. Tap where the fairy's "Continue" button is

The first two taps are to close out informational boxes that may have been opened while the macro ran with a panel open. The third is to ensure either no panels are open, or the Hero panel is open, and the fourth is to swap to a known, safe panel. Selecting the bottom-right pet is just to maximize pet damage in case it got swapped, then close the pet panel. There's a chance that we missed a fairy continue button and all of the previous taps were useless; sheepishly tap the Continue button.

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

Surprisingly, this is currently the macro that is the most likely to fail on you; the second and third prestige buttons seem to shift up/down based on the content of the windows. I haven't gotten the layout quite right yet 100% of the time, so let me know if it fails on you.

1. Open Hero panel
1. Tap Prestige button
1. Wait a few seconds
1. Tap Prestige button on pop-up
1. Wait a few seconds (slow and steady, folks....)
1. Tap the last Prestige button
1. Wait ~10 seconds
1. Tap where the "Max Equipment Drops" warning might show up

## BoS Max Upgrade

**WARNING**: *Macros can't see!!* If you recently unlocked a new artifact and it's still at the top of the list, this macro WILL UPGRADE THAT INSTEAD. Probably not what you want; so restart the game or prestige without this macro then restart

1. Open the Artifact panel
1. Select MAX from the quantity selection
1. Tap the top-most artifact (directly under the "Discover" button) 7 times.
1. Select lowest option in quantity selection (because I've wasted enough relics forgetting to change this back)
1. Close the panel
1. Run "Ensure Closed" process

## Titan Macros

All of these are straight-forward: Tap and hold the part in question and squiggle around for 32-ish seconds. Each squiggle is a randomly generated distance from the "center point" (as determined with Totem of Power), so you should get 600 taps.

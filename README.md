# BlueStacks Macro Generator

_If you're here for TapTitans2 macros, head into that folder!_

This is a little project I spun up for generating BlueStacks macros after I discovered they are essentially just
massive JSON files. Instead of hand-editing the files to change behavior (i.e., losing my mind even faster than
normal), I wrote some scripts to generate the files after updating their behavior logically.

Some things to note: updating files directly in the BlueStacks `UserScripts` folder *WILL* be reflected in all new runs
of a given macro, but it will *NOT* change the behavior of a currently running macro; you'll need to restart it.

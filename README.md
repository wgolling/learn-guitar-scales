This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Deployed at: https://wgolling.github.io/learn-guitar-scales/

# Learn Guitar Scales.

This app is being developed for the purpose of learning guitar scales, in particular different "modes". The idea behind a mode in music theory is that you take the standard Major scale, but just start on a diffenet note; for example the Aeolian mode, which starts on the 6-th note of the major scale, is the same scale as the relative Minor.

The user can select the mode they want to practice, and select frets on the fretboard. The scale always starts on the second fret, and is 2 octaves. When the user has correctly selected all the notes in the mode, that app informs them with a "You did it!"

## Change log
* v1.0 
  - The first working version of the game.
  - The user can select modes and frets, and the game informs them when they've won.

## TODO/issues

* There is currently no indication that the scale always starts on E2.

* The n-th fret on the G string is the (n-4)-th fret on the B string (rather than the usual n-5), so there is precisely one pair of frets representing the same note. In the current version the first fret of the B string is just never used. What I would prefer is that if that particular note is in the scale then the user could select either G5 or B1 but not both.

* Introduce game states: SelectMode, SelectFrets, GameOver.
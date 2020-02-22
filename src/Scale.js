/**
 * A helper class for constructing scales.
 */
class Scale {

  // Each scale is two octaves.
  static twoOctaves = 24;
  
  static modes = {
    names: [
      "Ionian", 
      "Dorian", 
      "Phrygian", 
      "Lydian", 
      "Mixolydian",
      "Aeolian",
      "Locrian"
    ],
    // Each mode is based on the same pattern of tones and semi-tones.
    pattern: [2, 2, 1, 2, 2, 2, 1],
  };

  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
  }

  /**
   * Constructs and empty scale.
   */
  static empty() {
    return new Scale("Empty", this.emptyArray());
  }

  static emptyArray() {
    return Array(this.twoOctaves).fill(false);
  }

  /**
   * Constructs the given mode.
   */
  static mode(scale_mode) {
    if (scale_mode < 0 || scale_mode >= Scale.modes.names.length) {
      throw new Error("Mode must be between 0 and 6");
    }
    return new Scale(this.modes.names[scale_mode], this.patternToNotes(scale_mode));
  }
  
  /**
   * Constructs the mode from the pattern, starting at the given point.
   */
  static patternToNotes(startingPoint) {
    var notes = this.emptyArray();    
    var pattern = this.modes.pattern;

    var spotInPattern = startingPoint;
    var nextNote = 0;
    var i;
    for (i = 0; i <= this.twoOctaves; i++) {
      if (i === nextNote) {
        notes[i] = true;
        nextNote += pattern[spotInPattern];
        spotInPattern = (spotInPattern + 1) % pattern.length;
      }
    }

    return notes;
  }
}

export default Scale;

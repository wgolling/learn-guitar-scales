class Scale {

  static twoOctaves = 24;
  
  static modes = {
    names: [
      "Ionian", 
      "Dorian", 
      "Phrygian", 
      "Lydian", 
      "Mixolydian",
      "Aeolian",
      "?"
    ],
    pattern: [2, 2, 1, 2, 2, 2, 1],
  };

  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
  }

  static empty() {
    return new Scale("Empty", this.emptyArray());
  }

  static emptyArray() {
    return Array(this.twoOctaves).fill(false);
  }

  static mode(scale_mode) {
    if (scale_mode < 0 || scale_mode >= Scale.modes.names.length) {
      throw new Error("Mode must be between 0 and 6");
    }
    return new Scale(this.modes.names[scale_mode], this.patternToNotes(scale_mode));
  }
  
  static patternToNotes(startingPoint) {
    var notes = this.emptyArray();    
    var pattern = this.modes.pattern;

    var spotInPattern = startingPoint;
    var nextNote = 0;
    var i;
    for (i = 0; i <= 24; i++) {
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

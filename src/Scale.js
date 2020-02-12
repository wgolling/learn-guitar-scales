class Scale {
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
    return new Scale("Empty", []);
  }

  static mode(scale_mode) {
    if (scale_mode < 0 || scale_mode >= Scale.modes.names.length) {
      throw new Error("Mode must be between 0 and 6");
    }
    var notes = this.patternToScale(this.modes.pattern, scale_mode);
    return new Scale(this.modes.names[scale_mode], notes);
  }
  
  static patternToScale(pattern, startingPoint) {
    var scale = Array(5 * 6).fill(false);

    var spotInPattern = startingPoint;
    var note = 0;
    var notesPlaced; 
    for (notesPlaced = 0; notesPlaced < 15; notesPlaced++) {
      scale[note] = true;

      spotInPattern = spotInPattern % pattern.length;
      note = note + pattern[spotInPattern];
      spotInPattern++;
    }
    return scale;
  }
}

export default Scale;
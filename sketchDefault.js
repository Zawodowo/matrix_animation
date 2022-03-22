function sketch(p5) {
  let font;
  let columnArray = [];


  p5.preload = () => {
    font = p5.loadFont('./PressStart2P-Regular.ttf')
  }


  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.textFont(font);

    p5.frameRate(60);

    let newcolumn;
    for(let j=0; j<((window.innerWidth-30)/60); j++) {
      newcolumn = new Column();
      for(let i=0; i<15; i++) {
        newcolumn.addLetter(new Letter());
      }
      newcolumn.moveColumn({x: 15 + 60*j, y: p5.int(p5.random(-1500, -900))})
      columnArray.push(newcolumn);
    }
    

    p5.smooth(2);
    p5.noStroke();
  };

  p5.draw = () => {
    p5.background(19, 30, 42);

    let column;
    for(let j=0; j<columnArray.length; j++) {
      column = columnArray[j];

      const fSize = column.fontSize;
      const opacity = column.opacity;
      const columnPos = column.startingPosition;

      for(let i=0; i < column.letters.length; i++) {
        const letter = column.letters[i].char;
        
        if(i==column.letters.length-1) {
          p5.fill(77, 255, 175, opacity*2);
        } else {
          p5.fill(30, 185, 114, opacity);
        }
        
        p5.textSize(fSize);
        p5.text(p5.char(letter), columnPos.x, columnPos.y + (fSize+15) + (fSize*1.25) * i);
        if(p5.frameCount % p5.int(p5.random(250)) == 1) {
          column.letters[i].changeLetter();
        }
      }

      if(columnPos.y > window.innerHeight) {
        column.moveColumn({x: columnPos.x, y: -900});
        column.changeFontSize();
        column.changeOpacity();
      } else {
        column.moveColumn({x: columnPos.x, y: 4 + columnPos.y + fSize/10})
      }
      
    }
  };

  class Letter {
    constructor() {
      this.char = p5.int(p5.random(33, 94));
    }
    changeLetter() {
      this.char = p5.int(p5.random(33, 94));
    }
  };

  class Column {
    constructor() {
      this.letters = [];
      this.fontSize = p5.int(p5.random(14, 45));
      this.opacity = ((this.fontSize/45)*2)*100;
      this.startingPosition = {x: 50, y: 200};
    }
    changeFontSize() {
      this.fontSize = p5.int(p5.random(14, 45));
    }
    changeOpacity() {
      this.opacity = ((this.fontSize/45)*2)*100;
    }
    moveColumn(pos) {
      this.startingPosition = pos;
    }
    addLetter(letter) {
      this.letters.push(letter)
    }
  }
};

export default sketch;



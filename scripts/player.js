class Player {
    constructor(name, color) {
      this.name = name;
      this.color = color;
      this.currentTurn = false;
      this.timeForTurn = 15;
    }
  
    setCurrentTurn(turn) {
      this.currentTurn = turn;
      this.timeForTurn = 15;
      const message = turn ? 'Is your turn:' : 'Waiting for Opponent:';
      $('#turn').text(message);
    }
  
    getPlayerName() {
      return this.name;
    }
  
    getPlayerColor() {
      return this.color;
    }

    getTimeForTurn(){
      return this.timeForTurn;
    }
  
    getCurrentTurn() {
      return this.currentTurn;
    }
  }
var player, game;
const socket = io.connect('http://Localhost:8888');

function init(){
    const p1Color = "white";
    const p2Color = "black";

    // Create a new game.
    $('#new').on('click', () => {
        const name = $('#nameNew').val();
        if (!name) {
          alert('Please enter your name:');
          return;
        }
        player = new Player(name, p1Color);
        socket.emit('createGame', { name });
      });
    
      // Join an existing game on the entered roomId.
      $('#join').on('click', () => {
        const name = $('#nameJoin').val();
        const roomID = $('#room').val();

        if (!name || !roomID) {
          alert('Please enter your name and game ID:');
          return;
        }
        player = new Player(name, p2Color);
        socket.emit('joinGame', { name, room: roomID });
      });

      //When user keyup enter on input click button
      $('#nameNew').keyup( (e) => {
        if(e.which == 13){
          $('#new').click();
        }
      });

      $('#nameJoin').keyup( (e) => {
        if(e.which == 13){
          $('#join').click();
        }
      });

      $('#room').keyup( (e) => {
        if(e.which == 13){
          $('#join').click();
        }
      });
    
      // New Game created by current client
      socket.on('newGame', (data) => {
        const message = `Hello ${data.name}<br/> Game ID: 
          ${data.room}<br/> Waiting for player 2...`;
    
        // Create game for first player
        game = new Game(data.room);
        game.displayBoard(message);
      });
    
      //Player 1 joined the game
      socket.on('player1', (data) => {
        const message = `Hello, ${player.getPlayerName()}`;
        $('#userHello').html(message);
        player.setCurrentTurn(false);
      });
    
      //Player 2 joined the game
      socket.on('player2', (data) => {
        const message = `Hello, ${data.name}`;
    
        // Create game for player 2
        game = new Game(data.room);
        game.displayBoard(message);
        player.setCurrentTurn(true);
      });
    
      //After played turn update board and give new turn to other player
      socket.on('turnPlayed', (data) => {
        let row = game.getRowFromTile(data.tile);
        let col = game.getColFromTile(data.tile);

        const opponentColor = player.getPlayerColor() === p1Color ? p2Color : p1Color;
        game.updateBoard(opponentColor, row, col, data.tile);
        player.setCurrentTurn(true);
      });
    
      //Notify users that game has ended
      socket.on('gameEnd', (data) => {
        game.endGameMessage(data.message);
      });

      //If there is error, send message and reload page
      socket.on('err', (data) => {
        alert(data.message);
        location.reload();
      });

      socket.on('userDisconnect', () =>{
        const message = `You win! Other player was disconnected!`;
        game.endGameMessage(message);
      })
}

init();
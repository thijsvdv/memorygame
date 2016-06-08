import Tile from './tile'
import config from './config'
import { helpers, getImage } from './helpers'

helpers()

let memory = function() {

  let canvas = document.getElementById('game'),
      context = canvas.getContext('2d'),
      imageObj = new Image(),
      timerRunning = false,
      hideFaces,
      startTime = 0,
      millis = 0,
      finalTime = 0;

  let w = document.getElementById('game').offsetWidth;
  document.getElementById('game').width = w;
  document.getElementById('game').height = w;
  
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, w, w);

  // window.onunload = function() {
  //   console.log('unload session');
  //   var xmlhttp = new XMLHttpRequest();
  //   xmlhttp.open('POST', '/clear-session');
  //   // xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //   // xmlhttp.send(JSON.stringify($data));
  //   // xmlhttp.responseType = 'json';
  //   // xmlhttp.onreadystatechange = function() {
  //   //   if (xmlhttp.readyState == 4) {
  //   //     var data = xmlhttp.response;
  //   //   }
  //   // }
  // }

  // Declare an array of all possible faces
  let faces = config.images.map( (img) => getImage(img) )

  // Duplicate our faces array
  let cloneFaces = faces.slice(0)

  // Make an array which has 2 of each, then randomize it
  let selected = []
  for (let i = 0; i < (config.num_cols * config.num_rows) / 2; i++) {
      // Randomly pick one from the array of remaining faces
      let randomInd = Math.floor(cloneFaces.length*Math.random(cloneFaces.length))
      let face = cloneFaces[randomInd]

      // Push twice onto array
      selected.push(face)
      selected.push(face)

      // Remove from array
      cloneFaces.splice(randomInd, 1)
  }

  // Now we need to randomize the array
  selected.sort( () => 0.5 - Math.random() )

  // Create the tiles
  let tiles = []
  for (let i = 0; i < config.num_cols; i++) {
    for (let j = 0; j < config.num_rows; j++) {
      tiles.push(new Tile({ x: i * config.tile_width, y: j * config.tile_height, face: selected.pop(), context: context }))
    }
  }

  // Now draw them face down
  for (let i = 0; i < tiles.length; i++) {
      tiles[i].drawFaceDown()
  }

  let flippedTiles = []
  let numTries = 0
  let timer
  let numclick = 0

  let fix = (t) => (t<10) ? '0' + t : t

  canvas.addEventListener('click', (e) => {
    // Start the timer
    if(!timerRunning) {
      var hasher = new Hashids(config.hashids.salt, config.hashids.length, config.hashids.alphabet);

      sendXMLHttpRequest({
        started_game:1,
        nonce: hasher.encode(1)
      });

      // timer = setInterval(() => {
      //   startTime++
      //   let date = new Date(null)
      //   date.setSeconds(startTime/100)
      //   let time = fix(date.getUTCMinutes()) + ':' +  fix(date.getUTCSeconds())

      //   $('.user__time').text(time)
      // }, 10)

      // START BETTER TIMER

      timerRunning = true

      function fix(t) {
        return (t<10) ? '0' + t : t;
      }

      let startMinutes = new Date().getMinutes();
      let startSeconds = new Date().getSeconds();
      let startMillis = new Date().getTime();

      function tick() {
        window.requestAnimFrame(function() {
          var date = new Date();
          millis = new Date().getTime() - startMillis;
          var d = new Date(millis);
          startTime = Math.floor(millis/10);

          $('.user__time').text(fix(d.getMinutes()) + ':' + fix(d.getSeconds()));
          // console.log(Math.floor(millis/10));
          if(timerRunning) tick();
        });
      }
      tick();

      // END BETTER TIMER

      // timerRunning = true
    }

    // If onclick there are already 2 tiles facing up, and they're not a pair,
    // flip them back immediately before continuing
    if(flippedTiles.length === 2) {
      clearTimeout(hideFaces)
      for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].isMatch) {
          tiles[i].drawFaceDown()
        }
      }
      flippedTiles = []
    }

    for (let i = 0; i < tiles.length; i++) {
      // Which tile are we clicking?
      if (tiles[i].isUnderMouse(e.offsetX, e.offsetY)) {
        // If already flipped, do nothing
        if(!tiles[i].isFaceUp) {
          // If less than two flipped, we can flip the current one
          if (flippedTiles.length < 2) {
            tiles[i].drawFaceUp()
            flippedTiles.push(tiles[i])
            // If that makes two, it's another 'try'...
            if (flippedTiles.length === 2) {
              numTries++;
              $('.user__clicks').text(numTries)
              // ...so check if they're the same
              if (flippedTiles[0].face === flippedTiles[1].face) {
                flippedTiles[0].isMatch = true
                flippedTiles[1].isMatch = true
              // else turn them back after a while
              } else {
                requestAnimFrame(clear)
              }
            }
          }
        }
      }
    }

    // Have all matches been found?
    let foundAllMatches = true
    for (let i = 0; i < tiles.length; i++) {
      foundAllMatches = foundAllMatches && tiles[i].isMatch
    }

    // If we have found all matches, stop the timer, and display a message
    if (foundAllMatches) {
      var hasher = new Hashids(config.hashids.salt, config.hashids.length, config.hashids.alphabet);

      timerRunning = false; // Stop new timer
      // clearInterval(timer) // TODO: UNCOMMENT IF OLD TIMER
      // console.log("You found them all in " + numTries + " tries and " + millis + " seconds!");
      finalTime = millis + "";
      finalTime = finalTime.slice(0, -1);
      // console.log("FUCK THIS SHIT", finalTime);
      sendXMLHttpRequest({
        clicks: numTries,
        time: finalTime,
        nonce: hasher.encode([numTries, startTime])
      }, true);
    }
  });

  function clear() {
    hideFaces = setTimeout((time) => {
      // tiles[0].clearCanvas();
      // context.fillStyle = "#ffffff";
      // context.fillRect(0, 0, w, w);
      for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].isMatch && !tiles[i].fix) {
          tiles[i].drawFaceDown()
        }
      }
       flippedTiles = []
    }, 1000)
  }

  function sendXMLHttpRequest($data, $redirect) {

    $.ajax({
      'method': 'post',
      'url': '/game-score?v=' + Math.random(),
      'cache': false,
      'dataType': 'json',
      'data': $data,
    }).done(function(data) {
      // console.log(data);
      // TODO: UNCOMMENT THIS IF PRODUCTION
      if(!data.state) {
        window.location = '/deelgenomen';
      }

      if($redirect) {

        $('#game').addClass('done')
        $('.overlay').addClass('active')


        var times = [(finalTime + "").slice(0,-2), (finalTime + "").slice(-2)];

        // var times = finalTime/100 + ""; //startTime/100 + "";
        // times = times.split('.');
        // console.log(times);

        // $('.is-time').text(startTime);
        $('.is-time').text(times[0] + ' seconden, ' + times[1] + ' honderdsten');
        $('.is-clicks').text(numTries);

        setTimeout(function() {
          // window.location = '/thanks'
          // $('.overlay').fadeIn();
          $('.overlay').addClass('fadein')
          $('body').addClass('is-finished');
          
          var msg = 'Ik deed mee aan de Club Mate Memory Game van Het Bier- en Wijnhuis! Mijn score is ' + times[0] + ' seconden, ' + times[1] + ' honderdsten! Doe jij beter?';
          $('.sharelink').attr('href', $('.sharelink').attr('href') + msg);
        }, 1000)

      }
    });
  }
}

export { memory }
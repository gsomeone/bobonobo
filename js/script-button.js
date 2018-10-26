window.onload=function(){

  document.getElementById("item").onmousedown = function() {mouseDown()};
  document.getElementById("item").onmouseup = function() {mouseUp()};



    var client = mqtts.connect('mqtts://2fac2a74:6b1467441becad02@broker.shiftr.io', {
      clientId: 'javascript'
    });

    client.on('connect', function(){
      console.log('client has connected!');
    });

    client.on('message', function(topic, message) {
      console.log('new message:', topic, message.toString());

      if (message == '1' ) {
        console.log('yolo');

        document.getElementById("item").style.backgroundColor = "#0066CC";


      } else {
        document.getElementById("item").style.backgroundColor = "white";
        console.log('rekt');
      }


    });


    client.subscribe('/k2w');






    var int00;
    var int01;

    function mouseDown() {
        int01 = setInterval(function() { repeatingfunction1(); }, 800);
        clearInterval(int00);
      }




    function mouseUp() {
      clearInterval(int01);
      int00 = setInterval(function() { repeatingfunction(); }, 1000);
      }
    //
    // setInterval(function(){
    //    client.publish('/p2k', 'N');
    //   }, 200);

      function repeatingfunction() {
      client.publish('/w2k', 'n');
    }

    function repeatingfunction1() {
    client.publish('/w2k', 'y');
  }

    // var int00; // declared here to make it visible to clearInterval.
    //
    //   $('#item').mousedown(function(){
    //       int00 = setInterval(function() { repeatingfunction(); }, 100);
    //   }).mouseup(function() {
    //
    //       clearInterval(int00);
    //       client.publish('/p2k', 'N');
    //   });
    //
    //   function repeatingfunction() {
    //     client.publish('/p2k', 'Y');
    //       // This will repeat //
    //   }











  // VVV ANIMATION VVV


  // The item (or items) to press and hold on
    var item = document.querySelector("#item");

    var timerID;
    var counter = 0;

    var pressHoldEvent = new CustomEvent("pressHold");

    // Increase or decreae value to adjust how long
    // one should keep pressing down before the pressHold
    // event fires
    var pressHoldDuration = 50;

    // Listening for the mouse and touch events
    item.addEventListener("mousedown", pressingDown, false);
    item.addEventListener("mouseup", notPressingDown, false);
    item.addEventListener("mouseleave", notPressingDown, false);

    item.addEventListener("touchstart", pressingDown, false);
    item.addEventListener("touchend", notPressingDown, false);

    // Listening for our custom pressHold event
    item.addEventListener("pressHold", doSomething, false);



    function pressingDown(e) {
      // Start the timer
      requestAnimationFrame(timer);


      e.preventDefault();

      console.log("Pressing!");

    }

    function notPressingDown(e) {
      // Stop the timer
      cancelAnimationFrame(timerID);
      counter = 0;

      item.style.setProperty("--scale-value", 1);

      console.log("Not pressing!");
    }
    //
    // Runs at 60fps when you are pressing down
    //
    function timer() {
      console.log("Timer tick!");

      if (counter < pressHoldDuration) {
        timerID = requestAnimationFrame(timer);
        counter++;


        item.style.setProperty("--scale-value", 1 + counter / 50);

      } else {
        console.log("Press threshold reached!");
        item.dispatchEvent(pressHoldEvent);
      }
    }

    function doSomething(e) {
      console.log("pressHold event fired!");
    }

  item.style.setProperty("--scale-value", 1 + counter / 50);



}

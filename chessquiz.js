
    var count=0;
    var fontSize=36;

    function supports_html5_storage() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null && localStorage !== undefined;
      } catch (e) {
        return false;
      }
    }

    if(supports_html5_storage()) {
        if(localStorage.lastBoard)
            count = parseInt(localStorage.lastBoard);
        if(localStorage.fontSize)
            fontSize = parseInt(localStorage.fontSize);
      function localStore(key, val) {
        localStorage.setItem(key, val);
      }
    } else
      function localStore(key, val) {
      }

    var chesstag='<chess cstyle="font-size:'+fontSize.toString()+'pt;" mode="color" dir="up">';
    var border=false;

    function changeFont(sz)
    {
        fontSize = fontSize + sz;
        localStore('fontSize', fontSize);
        chesstag = chesstag.replace(/(.*font-size:)\d+(pt.*)/,'$1'+fontSize+'$2');
        ShowBoard();
    }

    function changeBorder(p)
    {
        var s;
        if (p) {
            s = /(.*)>/.exec(chesstag);
            chesstag = s[1] + ' border="a1">';
        } else {
            s = /(.*) border="a1"(.*)/.exec(chesstag);
            if (s)
                chesstag = s[1] + s[2];
        }
        ShowBoard();
    }

    function changeMode(mode)
    {
        var s = /(.*")(bw|color)+(".*)/.exec(chesstag);
        chesstag = s[1] + mode + s[3];
        ShowBoard();
    }

    function setDir(dir)
    {
        var s = /(.*dir=")(up|down)+(".*)/.exec(chesstag);
        chesstag = s[1] + dir + s[3];
    }

    function changeDir(dir)
    {
        setDir(dir)
        ShowBoard();
    }

    function ShowBoard() {
        var msg;
        if (problems[count].search(' w ') != -1) {
            setDir('up');
            msg = "White";
        } else {
            setDir('down');
            msg = "Black";
        }
        document.getElementById('board').innerHTML=chesstag+problems[count].replace(/(.*) (b|w) .*/,'$1')+'</chess>';
        parseChess();
        document.getElementById('msg').innerHTML=msg+" to play and win!     ("+(count+1)+' of '+problems.length+')';
    }

    function GotoGame(n) {
        count = n;
        if (count < 0)
            count = problems.length-1;
        else if (count >= problems.length)
            count = 0;
        localStore('lastBoard', count.toString());

        ShowBoard();
    }

    function RandomGame() {
        GotoGame(Math.floor(Math.random() * (problems.length)));
    }

// Window.onload = function {
document.addEventListener("DOMContentLoaded", function() {
    //console.log("showboard");
    document.getElementById("bfont+").addEventListener("click", () => {changeFont(4);});
    document.getElementById("bfont-").addEventListener("click", () => {changeFont(-4);});
    document.getElementById("button0").addEventListener("click", () => {GotoGame(0);});
    document.getElementById("button1").addEventListener("click", () => {GotoGame(count-1);});
    document.getElementById("button2").addEventListener("click", () => {GotoGame(count+1);});
    document.getElementById("button3").addEventListener("click", () => {GotoGame(problems.length-1);});
    document.getElementById("button4").addEventListener("click", RandomGame);
    ShowBoard();
});

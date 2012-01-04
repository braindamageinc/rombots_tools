var canvas  ;
var context ;
 
var destX = 0;
var destY = 0;
 
var sourceX = 0;
var sourceY = 0;
var sourceWidth;
var sourceHeight;
var destWidth;
var destHeight;

var imageObj;

//<!-- MODIFICA PENTRU FIECARE ANIMATIE !!! -->
var numColumns = 10;     //<!-- cate coloane are fisierul (TOTAL) -->
var numRows = 1;       // <!-- cate randuri are fisierul (TOTAL) -->
var refreshRate = 100; // <!-- framerate in milisecunde -->
var flipVertical = false;// <!-- daca sa flipui spriteul cand desenez -->
var imageFileSrc = null;
var refreshInterval = null;
//<!--  STOP  -->

function init_JQuery() {

$("#refreshBtn").button().click(function() {
    
    if (refreshInterval != null)
        window.clearInterval(refreshInterval);
    
    if (imageFileSrc != null)
        initAnimation(imageFileSrc);

});

}

function refreshImg() 
{
 context.clearRect(0, 0, canvas.width, canvas.height);
 
 sourceX += sourceWidth;
 if (sourceX > imageObj.width - sourceWidth)
      {
        sourceX = 0;
        sourceY += sourceHeight;
      }
 if (sourceY > imageObj.height - sourceHeight)
    {
     sourceX = 0;
     sourceY = 0;
    }
 
context.drawImage(imageObj, sourceX, sourceY, sourceWidth,
    sourceHeight, destX, destY, destWidth, destHeight);

}

function initAnimation(imageFile) {
    
imageObj = new Image();
canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");

numColumns = document.getElementById("numCols").value;
numRows = document.getElementById("numRows").value;
refreshRate = document.getElementById("numRefreshMs").value;

    imageObj.onload = function(){
        
        sourceWidth = imageObj.width / numColumns;
        sourceHeight = imageObj.height / numRows;
        destWidth = imageObj.width / numColumns;
        destHeight = imageObj.height / numRows;
        
        if (flipVertical)
        {
         context.translate(0, destHeight);
         context.scale(1, -1); 
        }
        
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth,
	        sourceHeight, destX, destY, destWidth, destHeight);

        if (refreshInterval != null)
            window.clearInterval(refreshInterval);

       refreshInterval = window.setInterval(refreshImg, refreshRate);
    };

imageObj.src = imageFile;
imageFileSrc = imageFile;  

};


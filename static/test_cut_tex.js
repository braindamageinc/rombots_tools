var canvas  ;
var context ;
 
var destX = 0;
var destY = 0;
 
var sourceX = 0;
var sourceY = 0;
var tileWidth;
var tileHeight;
var destWidth;
var destHeight;

var imageObj;

// MODIFICA PENTRU FIECARE ANIMATIE !!! -->
var numColumns = 10;    // <!-- cate coloane are fisierul (TOTAL) -->
var numRows = 1;        //<!-- cate randuri are fisierul (TOTAL) -->
var refreshRate = 180;  //<!-- framerate in milisecunde -->
var imageFile = "nivel_partat.png"; //<!-- fisierul cu anim. -->
var flipVertical = false; //<!-- daca sa flipui spriteul cand desenez -->
var extraPixelsBottom = 1;
var extraPixelsTop = 1;
//<!--  STOP  -->


function init_JQuery() {
  $("#saveBtn").button().click(function() {
    saveCanvas();
  });

  $("#cutBtn").button().click(function() {
    cutImage();
  });
}

function saveCanvas()
{
   canvas = document.getElementById('myCanvas');
   window.location = canvas.toDataURL('image/png');

  
}

function loadImageObject()
{
   imageObj = new Image();
   canvas = document.getElementById("myCanvas");
   context = canvas.getContext("2d");
 
 
    imageObj.onload = function(){
        
        
    };
    imageObj.src = document.getElementById('bgImage').src;

}

function cutImage()
{
  loadImageObject();   
    
  inputBox = document.getElementById("numTiles");
  numTiles = inputBox.value;

  numColumns = 4;
  numRows = numTiles / numColumns;

  tileWidth = imageObj.width;
  tileHeight = imageObj.height / numTiles + extraPixelsBottom + extraPixelsTop;
  destWidth = tileWidth * numColumns;
  destHeight = tileHeight * numRows;
            
  canvas.width = destWidth;
  canvas.height = destHeight;

  tileHeightReal = imageObj.height / numTiles;

  destX = 0;
  destY = 0;

  sourceX = 0;
  sourceY = imageObj.height - tileHeightReal;

  for (i=0; i < numTiles; i++)
  {
    //draw normal tile
    context.drawImage(imageObj, sourceX, sourceY, tileWidth,
    tileHeightReal, destX, destY + extraPixelsTop, tileWidth, tileHeightReal);
    
    //draw extra top pixels
    context.drawImage(imageObj, sourceX, sourceY, tileWidth,
    extraPixelsTop, destX, destY, tileWidth, extraPixelsTop);
    
//    context.fillStyle   = '#ff0000'; // red
//    context.fillRect(destX, destY, tileWidth, extraPixelsTop);

    //draw extra bottom pixels
    context.drawImage(imageObj, sourceX, sourceY + tileHeightReal - 1, tileWidth,
    extraPixelsBottom, destX, destY + tileHeightReal + extraPixelsTop, tileWidth, extraPixelsBottom);

//    context.fillStyle   = '#00f'; // blue
//    context.fillRect(destX, destY + tileHeightReal + extraPixelsTop, tileWidth, extraPixelsBottom);
   
    sourceY -= tileHeightReal;

    destX += tileWidth;    
    if (destX >= destWidth)
    {
      destX = 0;
      destY += tileHeight;
    }

  }

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

window.onload = function(){
    // run when window opens   
};



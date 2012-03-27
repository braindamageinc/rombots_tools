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

var mCurrentFrameIdx = 0;
var mResized = false;

function init_JQuery() {
  $("#saveBtn").button().click(function() {
    saveCanvas();
  });

}

function saveCanvas()
{
   canvas = document.getElementById('myCanvas');
   window.location = canvas.toDataURL('image/png');
  
}

var mLayoutValues = [ [1,1] , [1,2] , [2,2] , [2,4] , [4,4] , [4,8] ];
var mLayoutUsed = 0;

function initAnimSheet(numFrames) {
    mCurrentFrameIdx = 0;
    mResized = false;
    
    prevSum = 0;
    for (var i=0; i < mLayoutValues.length; i++)
    {
        currSum = mLayoutValues[i][0] * mLayoutValues[i][1];        
        if (numFrames > prevSum && numFrames <= currSum )
        {
            mLayoutUsed = i;
            break;
        }
        prevSum = currSum;
    }
    
    console.log("layout: " + mLayoutUsed + " = " + mLayoutValues[mLayoutUsed][0] + ", "+mLayoutValues[mLayoutUsed][1]);

    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

}

var mImages = [];

function addFrame(imageFile) {
    
    imageObj = new Image();
    mImages[mCurrentFrameIdx] = imageObj;
    
    columns = mLayoutValues[mLayoutUsed][1];
    rows = mLayoutValues[mLayoutUsed][0];
    
    mImages[mCurrentFrameIdx].onload = function(){
        
        sourceWidth = this.width;
        sourceHeight = this.height;
        
        
        var currRow  = Math.floor(mCurrentFrameIdx / columns);
        var currCol = mCurrentFrameIdx % columns;
        
        destX = currCol * sourceWidth;
        destY = currRow * sourceHeight;
        destWidth = sourceWidth;
        destHeight = sourceHeight;
        
        console.log("idx " + mCurrentFrameIdx + " x: " + destX + " y: " + destY);
    
        if (mResized == false)
        {
            canvas.width = columns * sourceWidth;
            canvas.height = rows * sourceHeight;
            mResized = true;
        }

        console.log("canv W: " + canvas.width + " H: " + canvas.height);
        
        context.drawImage(this, destX, destY);
            
        
        mCurrentFrameIdx++;

    };

    mImages[mCurrentFrameIdx].src = imageFile;

};





window.onload = function(){
    // run when window opens   
};



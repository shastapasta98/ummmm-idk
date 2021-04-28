img = "";
status = "";
objects = [];
function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function preload()
{
   img = loadImage("dog_cat.jpg");
}

function draw()
{
    image(img,0,0,640,420);

    if(status != "")
    {
       for(i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "status : object detected";

           fill("#ff0000");
           percent = floor(objects[i].confidence *100);
           text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
           stroke("#ff0000");
           noFill();
           rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
       }
    }
}

function modelLoaded()
{
   console.log("model is I THINK loaded");
   status = true;
   objectDetector.detect(img,gotResults)
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
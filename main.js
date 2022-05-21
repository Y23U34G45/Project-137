Status = "";
input_text = "";
objects = [];
function setup(){
canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(300, 290);
video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text= document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("model_Loaded");
    Status = true;
}
function draw(){
    image(video,0,0,300,290);
    if(Status!= ""){
    objectDetector.detect(video, gotResults);
 for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "Status : Objects Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

    fill("#FF0000");
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#FF0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    if(object[i].label == input_text){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("object_found").innerHTML = input_text+" Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(input_text+"found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("object_found").innerHTML = input_text+" Not Found";
         }
      }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    }

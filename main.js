img = "";
alarm = "";
status = "";
objects = [];
var xalarm = document.getElementById("myAudio");

document.addEventListener('contextmenu', event => event.preventDefault());

function myalert() {
    document.getElementById("alert").style.display = "block";
    setTimeout(function () {
        document.getElementById("alert").style.display = "none";
    }, 3000);
}

function preload() {
    img = loadImage("dog_cat.jpeg");
    alarm = loadSound("Baby_Not_found.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Baby";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log("Error");
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == "person") {
                xalarm.pause();
                document.getElementById("status").innerHTML = "Baby Found";
                fill("#03befc");
                percentage = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y - 10);
                noFill();
                stroke("#03befc");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            } else {
                xalarm.play();
                document.getElementById("status").innerHTML = "Baby Not Found";
            }
        }
    }
}
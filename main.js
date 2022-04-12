Webcam.set({
    width:295,
    height:300,
    image_forat:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function (data_uri) {

        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+ data_uri +'"/>'
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ddWM-40vC/model.json', modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}
function identify_image() {
    img = document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = Math.round(results[0].confidence * 100) + "%";
    }
}

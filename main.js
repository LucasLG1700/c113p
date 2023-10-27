Webcam.set(
    {
        width:350,
        height:300,
        imageFormat : 'png',
        pngQuality:90
    }
);

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/f_d4zUgOR/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira precisão é " + prediction1;
    speakData2 = "E a segunda precisão é " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "✌️")
        {
            document.getElementById("updateEmoji").innerHTML = "&#9996";
        }
    }
    if(results[0].label == "positivo")
        {
            document.getElementById("updateEmoji").innerHTML = "&#128077";
        }
    
    if(results[0].label == "negativo")
        {
            document.getElementById("updateEmoji").innerHTML = "&#128078";
        }
    
    if(results[0].label == "de boa")
        {
            document.getElementById("updateEmoji").innerHTML = "&#129305";
        }
    
        if(results[1].label == "✌️")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#9996";
        }
        if(results[1].label == "positivo")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128077";
        }
        if(results[1].label == "negativo")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128078";
        }
        if(results[1].label == "de boa")
        {
            document.getElementById("updateEmoji2").innerHTML = "&#129305";
        }
    }

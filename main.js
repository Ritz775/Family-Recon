prediction_1 = "";
prediction_2 = "";

Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="captured_image" src="' + data_uri + '">';
  });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/QxtESeRNo/model.json",
  modelLoaded
);

function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is" + prediction_1;
  speak_data_2 = " And the second prediction is" + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

function modelLoaded() {
  console.log("modelLoaded");
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, got_result);
}

function got_result(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML =
      results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if (results[0].label == "Mother") {
      document.getElementById("update_emoji").innerHTML = "&#128105";
    }

    if (results[0].label == "Father") {
      document.getElementById("update_emoji").innerHTML = "&#128104";
    }

    if (results[0].label == "Brother") {
      document.getElementById("update_emoji").innerHTML = "&#128118";
    }
    if (results[0].label == "Ritvik (Hero)") {
      document.getElementById("update_emoji").innerHTML = "&#128102";
    }
    if (results[1].label == "Mother") {
      document.getElementById("update_emoji2").innerHTML = "&#128105";
    }

    if (results[1].label == "Father") {
      document.getElementById("update_emoji2").innerHTML = "&#128104";
    }

    if (results[1].label == "Brother") {
      document.getElementById("update_emoji2").innerHTML = "&#128118";
    }
    if (results[1].label == "Ritvik (Hero)") {
      document.getElementById("update_emoji2").innerHTML = "&#128102";
    }
  }
}

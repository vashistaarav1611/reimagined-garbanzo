var song = "";
var lwx, lwy, rwx, rwy = 0;
var scorelw = 0;

function preload() {
	song = loadSound("music.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();
	video = createCapture(VIDEO)
	video.hide();
	poseNET = ml5.poseNet(video, function () {
		console.log("posenet fired");
	});
	poseNET.on("pose", function (pose) {
		if (pose.length != 0) {
			console.log(pose);
			scorelw = pose[0].pose.keypoints[9].score;
			console.log(scorelw);
			lwx = pose[0].pose.leftWrist.x;
			lwy = pose[0].pose.leftWrist.y;
			rwx = pose[0].pose.rightWrist.x;
			rwy = pose[0].pose.rightWrist.y;
			console.log(`leftwrist x =${lwx},leftwrist y=${lwy}`);
			console.log(`rightwrist x =${rwx},rightwrist y=${rwy}`);
			song.setVolume(1);
			song.rate(1);
		}
	});
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
	stroke("#00FF00");
	console.log(vol);
	if (scorelw < 0.2) {
		circle(lwx, lwy, 20);
		circle(rwx, rwy, 20);
		line(lwx, lwy, rwx, rwy);
		lwynum = Number(lwy);
		removedes = floor(lwynum);
		vol = removedes / 500;
		document.getElementById("vol").innerHTML = `volume: ${vol}`;
		song.setVolume(vol);
		console.log("vol" +vol);
	}
}

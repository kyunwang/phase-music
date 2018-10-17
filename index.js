console.log('Its gonna rain!');

let audioContext = new AudioContext();

const startLoop = (audioBuffer, panOffset = 0) => {
	// Reads audiobuffer data and streams to other nodes
	let sourceNode = audioContext.createBufferSource();
	let pannerNode = audioContext.createStereoPanner();
	sourceNode.buffer = audioBuffer;

	sourceNode.loop = true;
	// On arriving at loopStart (seconds) it will start looping forever
	sourceNode.loopStart = 2.98;
	sourceNode.loopEnd = 3.8;

	pannerNode.pan.value = panOffset;

	sourceNode.connect(pannerNode);
	pannerNode.connect(audioContext.destination);

	sourceNode.start(0, 2.98); // Start at the loop
	// sourceNode.start();
};

fetch('./itsgonnarain.mp3')
	// Get the response as binary ArrayBuffer Object
	.then(res => res.arrayBuffer())
	// Decode into an playable form
	.then(arrBuffer => audioContext.decodeAudioData(arrBuffer))
	.then(audioBuffer => {
		console.log('Got audio: ', audioBuffer);
		startLoop(audioBuffer, 1);
		startLoop(audioBuffer, -1);
	})
	.catch(e => console.error(e));

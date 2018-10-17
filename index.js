console.log('Its gonna rain!');

let audioContext = new AudioContext();

fetch('./itsgonnarain.mp3')
	// Get the response as binary ArrayBuffer Object
	.then(res => res.arrayBuffer())
	// Decode into an playable form
	.then(arrBuffer => audioContext.decodeAudioData(arrBuffer))
	.then(audioBuffer => {
		console.log('Got audio: ', audioBuffer);
		let sourceNode = audioContext.createBufferSource();
		sourceNode.buffer = audioBuffer;
		sourceNode.connect(audioContext.destination);
		sourceNode.start();
	})
	.catch(e => console.error(e));

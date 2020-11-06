let successful_click_audio;
let song_audio;

let init_audio = () => {
	successful_click_audio = new Audio(successful_click_audio_file_name);
	successful_click_audio.volume = 0.05;
};
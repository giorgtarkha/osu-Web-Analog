let audio_volume = 1.0;

let successful_click_audio;

let init_audio = () => {
	successful_click_audio = new Audio(successful_click_audio_file_name);
	successful_click_audio.volume = audio_volume;
};
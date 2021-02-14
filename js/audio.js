let audio_volume = 0.5;

let successful_click_audio;

const init_audio = () => {
	successful_click_audio = new Audio(successful_click_audio_file_name);
	successful_click_audio.volume = audio_volume;
};

const update_volume = (vol) => {
	audio_volume = vol;
	successful_click_audio.volume = vol;
}
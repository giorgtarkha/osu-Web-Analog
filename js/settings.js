let click_button_one = "z";
let click_button_second = "x";
let cursor_fixed = false;
let cursor_has_trail = false;
let cursor_size = 1.0;
let trail_particle_number = 5;

let trail_setting_checkbox;
let cursor_fixed_setting_checkbox;
let click_button_1_setting_input;
let click_button_2_setting_input;
let volume_setting_input;
let song_volume_setting_input;

let click_button_1_setting_selected = false;
let click_button_2_setting_selected = false;

let init_settings = () => {
	trail_setting_checkbox = document.getElementById("trail-setting-checkbox");
	trail_setting_checkbox.addEventListener("click", (e) => {
		if (trail_setting_checkbox.checked) {
			cursor_has_trail = true;
		} else {
			cursor_has_trail = false;
		}
	});
	
	cursor_fixed_setting_checkbox = document.getElementById("cursor-fixed-setting-checkbox");
	cursor_fixed_setting_checkbox.addEventListener("click", (e) => {
		if (cursor_fixed_setting_checkbox.checked) {
			cursor_fixed = true;
		} else {
			cursor_fixed = false;
		}
	});
	
	click_button_1_setting_input = document.getElementById("click-button-1-setting-input");
	click_button_1_setting_input.addEventListener("focusin", (e) => {
		click_button_1_setting_selected = true;
	});
	click_button_1_setting_input.addEventListener("focusout", (e) => {
		click_button_1_setting_selected = false;
	});
	
	click_button_2_setting_input = document.getElementById("click-button-2-setting-input");
	click_button_2_setting_input.addEventListener("focusin", (e) => {
		click_button_2_setting_selected = true;
	});
	click_button_2_setting_input.addEventListener("focusout", (e) => {
		click_button_2_setting_selected = false;
	});
	
	song_volume_setting_input = document.getElementById("song-volume-setting-input");
	song_volume_setting_input.addEventListener("input", (e) => {
		update_song_volume(song_volume_setting_input.value / 100);
	});
	
	volume_setting_input = document.getElementById("volume-setting-input");
	volume_setting_input.addEventListener("input", (e) => {
		update_volume(volume_setting_input.value / 100);
	});
	
	update_setting_inputs();
}

let update_setting_inputs = () => {
	click_button_1_setting_input.value = click_button_one;
	click_button_2_setting_input.value = click_button_second;
}
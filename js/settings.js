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
	
	update_setting_inputs();
}

let update_setting_inputs = () => {
	console.log(click_button_one);
	console.log(click_button_second);
	click_button_1_setting_input.value = click_button_one;
	click_button_2_setting_input.value = click_button_second;
}
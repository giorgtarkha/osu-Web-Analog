const svg_path = "http://www.w3.org/2000/svg";

const asset_files_path = "assets/";

const main_song_player_object_name = "main_song_player";

const cursor_object_name = "cursor";

const circle_object_prefix = "circle";
const circle_outline_object_prefix = "outline";

const spawn_opacity_function_name = "spawn_opacity_function";
const outline_function_name = "outline_function";
const shake_function_name = "shake_function";
const destroy_opacity_function_name = "destroy_opacity_function";
const destroy_function_name = "destroy_circle_size_function";
const cursor_trail_animation_function_name = "cursor_trail_animation_function";
const non_fixed_cursor_animation_function_name = "non_fixed_cursor_animation_function";
const song_stopping_volume_function_name = "song_stopping_volume_function";

const shaky_circle_class_name = "shaky_circle";
const hidden_class_name = "hidden";
const cursor_particle_class_name = "cursor_particle";
const non_fixed_cursor_animation_class_name = "non_fixed_cursor_animation";

let game_object_functions = {};
let object_functions = {};

window.onload = () => {
	init_object_functions();
	init_scenes();
	init_main_menu();
	window.addEventListener("keyup", (e) => {
		if (current_scene == playing_game_scene) {
			if (e.key === "Escape") {
				load_pause_game_scene();
			}
			if (e.key == click_button_one || e.key == click_button_second) {			
				handleClick(mouse_x, mouse_y);
			}
		} else if (current_scene == settings_scene) {
			if (e.key === "Escape") {
				load_main_menu_scene();
			} else {
				if (click_button_1_setting_selected) {
					if ((e.key >= "a" && e.key <= "z") || (e.key >= "0" && e.key <= "9")) {
						click_button_one = e.key;
						update_setting_inputs();
					}
				} else if (click_button_2_setting_selected) {
					if ((e.key >= "a" && e.key <= "z") || (e.key >= "0" && e.key <= "9")) {
						click_button_second = e.key;
						update_setting_inputs();
					}
				}
			}
		} else if (current_scene == map_choose_scene) {
			if (e.key === "Escape") {
				load_main_menu_scene();
			} else if (e.key === "ArrowLeft") {
				go_to_previous_map();
			} else if (e.key === "ArrowRight") {
				go_to_next_map();
			}
		}
	});
	window.addEventListener("click", (e) => {
		if (current_scene == playing_game_scene) {
			handleClick(mouse_x, mouse_y);
		} else {
			if (!cursor_fixed) {
				play_non_fixed_cursor_animation();
			}
		}
	});
	window.addEventListener("contextmenu", (e) => {
		if (current_scene == playing_game_scene) {
			handleClick(mouse_x, mouse_y);
		}
		e.preventDefault();
	});
	window.addEventListener("resize", (e) => {
		if (current_scene == playing_game_scene || current_scene == pause_game_scene) {
			update_window_size_diff();
		}
	});
	
	init_audio();
	init_cursor();
	init_song_player();
	load_initial_screen_scene();
	init_settings();
	init_map_choose();
	init_pause();
	init_gameplay();
	init_result();
};

const init_object_functions = () => {
	object_functions[cursor_object_name] = {};
	object_functions[main_song_player_object_name] = {};
};
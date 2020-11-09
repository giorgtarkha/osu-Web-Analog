let svg_path = "http://www.w3.org/2000/svg";

let main_song_player_object_name = "main_song_player";

let cursor_object_name = "cursor";

let circle_object_prefix = "circle";
let circle_outline_object_prefix = "outline";

let spawn_opacity_function_name = "spawn_opacity_function";
let outline_function_name = "outline_function";
let shake_function_name = "shake_function";
let destroy_opacity_function_name = "destroy_opacity_function";
let destroy_function_name = "destroy_circle_size_function";
let cursor_trail_animation_function_name = "cursor_trail_animation_function";
let non_fixed_cursor_animation_function_name = "non_fixed_cursor_animation_function";
let main_song_player_progress_update_function_name = "main_song_player_progress_update_function";

let shaky_circle_class_name = "shaky_circle";
let hidden_class_name = "hidden";
let cursor_particle_class_name = "cursor_particle";
let non_fixed_cursor_animation_class_name = "non_fixed_cursor_animation";

let game_object_functions = {};
let object_functions = {};

window.onload = () => {
	init_object_functions();
	init_scenes();
	window.addEventListener("keypress", (e) => {
		if (current_scene == playing_game_scene) {
			if (e.key == click_button_one || e.key == click_button_second) {			
				handleClick(mouse_x, mouse_y);
			}
		}
	});
	window.addEventListener("click", (e) => {
		if (current_scene == playing_game_scene) {
			handleClick(mouse_x, mouse_y);
		}
		play_non_fixed_cursor_animation();
	});
	window.addEventListener("contextmenu", (e) => {
		if (current_scene == playing_game_scene) {
			handleClick(mouse_x, mouse_y);
		}
		e.preventDefault();
	});
	init_audio();
	init_cursor();
	init_song_player();
	load_main_menu_scene();
};

let init_object_functions = () => {
	object_functions[cursor_object_name] = {};
	object_functions[main_song_player_object_name] = {};
};
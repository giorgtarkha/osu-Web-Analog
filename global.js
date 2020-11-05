let svg_path = "http://www.w3.org/2000/svg";
let skin_path_name = "skin/";
let mouse_x = 0, mouse_y = 0;
let click_button_one = "x";
let click_button_second = "z";

let successful_click_audio_file_name = skin_path_name + "hit.wav";
let cursor_image_file_name = skin_path_name + "cursor.png";
let cursor_trail_image_file_name = skin_path_name + "/cursortrail.png";

let successful_click_audio;
let song_audio;

let cursor;

let radius = 40;
let outline_radius_addition = 60;
let outline_radius_decrease = 1;
let outline_radius_decrease_rate = 20;
let opacity_increase = 0.05;
let opacity_increase_rate = 20;
let destroy_opacity_decrease = 0.1;
let destroy_opacity_decrease_rate = 20;
let destroy_radius_increase = 2;

let early_click_point = 30;
let fifty_click_point = 20;
let hundred_click_point = 10;
let three_hundred_click_point = 0;
let miss_point = 0;

let game_screen;
let object_functions = {};
let destroyed_objects = new Set();
let last_object_id = 0;

let circle_object_prefix = "circle";
let circle_outline_object_prefix = "outline";

let spawn_opacity_function_name = "spawn_opacity_function";
let outline_function_name = "outline_function";
let shake_function_name = "shake_function";
let destroy_opacity_function_name = "destroy_opacity_function";
let destroy_function_name = "destroy_circle_size_function";

let shaky_circle_class_name = "shaky_circle";

let cursor_name = "cursor";
let cursor_image_offset;
let cursor_fixed;
let cursor_has_trail;

window.onload = () => {
	game_screen = document.getElementById("game-screen");
	window.addEventListener("keypress", (e) => {
		if (e.key == click_button_one || e.key == click_button_second) {
			handleClick(mouse_x, mouse_y);
		}
	});
	window.addEventListener("mousemove", (e) => {
		mouse_x = e.pageX;
		mouse_y = e.pageY;
		cursor.style.left = mouse_x - cursor_image_offset;
		cursor.style.top = mouse_y - cursor_image_offset;
	});
	init_audio();
	init_cursor();
};

let reset = () => {
	last_object_id = 0;
	object_functions = {};
};

let init_audio = () => {
	successful_click_audio = new Audio(successful_click_audio_file_name);
	successful_click_audio.volume = 0.05;
}

let init_cursor = () => {
	cursor = document.getElementById("cursor");
	cursor.onload = () => {
		cursor_image_offset = cursor.width / 2;
	}
	cursor.src = cursor_image_file_name;
}
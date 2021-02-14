let early_click_point = 20;
let fifty_click_point = 15;
let hundred_click_point = 10;
let three_hundred_click_point = 0;
let miss_point = 5;
let destroyed_objects = new Set();
let last_object_id = 0;
let score = 0;
let before_start_time = 3000;
let start_time;

let mouse_x, mouse_y;
let current_game_data;

let handleClick = (x, y) => {
	if (!cursor_fixed) {
		play_non_fixed_cursor_animation();
	}
	let elements = document.elementsFromPoint(x, y);
	let current_element = null;
	let current_element_object_id = null;
	let current_element_object_type = null;
	for (let i = 0; i < elements.length; i++) {
		let id = elements[i].id;		
		if (id == undefined || !id.includes("_")) {
			continue;
		}
		let object_type = id.substring(0, id.indexOf("_"));
		let object_id = parseInt(id.substring(id.indexOf("_") + 1, id.length));
		if (object_type == circle_object_prefix) {
			if (current_element_object_id == null || current_element_object_id > object_id) {
				current_element_object_id = object_id;
				current_element_object_type = object_type;
				current_element = elements[i];
			}
		}
	}
	if (current_element != undefined) {
		if (current_element_object_type == circle_object_prefix) {
			let response = try_to_destroy_circle(current_element);
		}
	}
};

let init_game = () => {
	song_player.pause();
	radius = map_data[current_song].radius;
	outline_radius_addition = map_data[current_song].outline_radius_addition;
	outline_radius_decrease_rate = map_data[current_song].outline_radius_decrease_rate;
	setTimeout(() => {
		song_player.play();
		start_current_song_over();
		init_circle_spawns();
	}, before_start_time);
}

let init_circle_spawns = () => {
	let data = map_data[current_song].flow;
	for (let i = 0; i < data.length; i++) {
		console.log(before_start_time + data[i].time);
		setTimeout(() => {
			spawn_circle(data[i].x, data[i].y);
		}, before_start_time + data[i].time)
	}
}

let reset_game = () => {
	last_object_id = 0;
	score = 0;
	game_object_functions = {};
	destroyed_objects = new Set();
};
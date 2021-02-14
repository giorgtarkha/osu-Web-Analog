let early_click_point = 20;
let fifty_click_point = 15;
let hundred_click_point = 10;
let three_hundred_click_point = 0;
let miss_point = 5;
let destroyed_objects = new Set();
let last_object_id = 0;
let score = 0;
let combo = 0;
let miss_count = 0;
let three_hundred_count = 0;
let one_hundred_count = 0;
let fifty_count = 0;
let before_start_time = 3000;
let start_time;
let time_passed;

let mouse_x, mouse_y;
let diff_w, diff_h;
let current_game_data;

let circle_timeout_functions = [];

let combo_counter;
let score_counter;

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
			if (response.destroyed && !response.miss) {
				if (response.score == 300) {
					three_hundred_count++;
				} else if (response.score == 100) {
					one_hundred_count++;
				} else {
					fifty_count++;
				}
				combo++;
				score += response.score * combo;
			} else if (response.miss) {
				combo = 0;
				miss_count++;
			}
			update_counters();
		}
	}
};

let init_game = () => {
	song_player.pause();
	update_window_size_diff();
	outline_radius_addition = map_data[current_song].outline_radius_addition;
	outline_radius_decrease_rate = map_data[current_song].outline_radius_decrease_rate;
	circle_timeout_functions.push(setTimeout(() => {
		start_time = Date.now();
		time_passed = 0;
		song_player.play();
		start_current_song_over();
		init_circle_spawns();
	}, before_start_time));
}

let pause_game = () => {
	time_passed += Date.now() - start_time;
	for (let i = 0; i < circle_timeout_functions.length; i++) {
		clearTimeout(circle_timeout_functions[i]);
	}
	circle_timeout_functions = [];
	pause_existing_circles();
}

let continue_game = () => {
	start_time = Date.now();
	continue_existing_circles();
	init_circle_spawns();
}

let init_circle_spawns = () => {
	let data = map_data[current_song].flow;
	for (let i = 0; i < data.length; i++) {
		if (data[i].time >= time_passed) { 
			circle_timeout_functions.push(setTimeout(() => {
				spawn_circle(data[i].x * diff_w, data[i].y * diff_h);
			}, data[i].time - time_passed));
		}
	}
}

let reset_game = () => {
	last_object_id = 0;
	score = 0;
	game_object_functions = {};
	destroyed_objects = new Set();
};

let update_combo_counter = () => {
	combo_counter.innerHTML = combo + "x";
}

let update_score_counter = () => {
	score_counter.innerHTML = "Score: " + score;
}

let update_counters = () => {
	update_combo_counter();
	update_score_counter();
}

let init_gameplay = () => {
	combo_counter = document.getElementById("combo-counter");
	score_counter = document.getElementById("score-counter");
	update_combo_counter();
	update_score_counter();
}

let show_gameplay_ui = () => {
	combo_counter.classList.remove(hidden_class_name);
	score_counter.classList.remove(hidden_class_name);
}

let hide_gameplay_ui = () => {
	combo_counter.classList.add(hidden_class_name);
	score_counter.classList.add(hidden_class_name);
}

let update_window_size_diff = () => {
	let current_width = window.innerWidth;
	let current_height = window.innerHeight;
	let original_width = map_data[current_song].original_screen_width;
	let original_height = map_data[current_song].original_screen_height;
	diff_w = current_width / original_width;
	diff_h = current_height / original_height;
	radius = map_data[current_song].radius * (diff_w + diff_h) / 2;
	outline_radius_addition = map_data[current_song].outline_radius_addition * (diff_w + diff_h) / 2;
}
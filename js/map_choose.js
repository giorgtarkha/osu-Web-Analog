let map_image_file_name = "background.jpg";

let current_map_image_container;
let previous_map_image_container;
let next_map_image_container;

let init_map_choose = () => {
	current_map_image_container = document.getElementById("current-map-image-container");
	previous_map_image_container = document.getElementById("previous-map-image-container");
	next_map_image_container = document.getElementById("next-map-image-container");
	
	current_map_image_container.addEventListener("click", (e) => {
		load_start_game_scene();
	});
	
	previous_map_image_container.addEventListener("click", (e) => {
		go_to_previous_map();
	});
	
	next_map_image_container.addEventListener("click", (e) => {
		go_to_next_map();
	});
}

let change_current_map_image = () => {
	current_map_image_container.src = songs_path + current_song + "/" + map_image_file_name;
	if (current_song_index > 0) {
		previous_map_image_container.classList.remove(hidden_class_name);
		previous_map_image_container.src = songs_path + song_names[current_song_index - 1] + "/" + map_image_file_name;
	} else {
		previous_map_image_container.classList.add(hidden_class_name);
	}		
	if (current_song_index < song_names.length - 1) {
		next_map_image_container.classList.remove(hidden_class_name);
		next_map_image_container.src = songs_path + song_names[current_song_index + 1] + "/" + map_image_file_name;
	} else {
		next_map_image_container.classList.add(hidden_class_name);
	}
}

let go_to_next_map = () => {
	play_next_song();
	change_current_map_image();
}

let go_to_previous_map = () => {
	play_previous_song();
	change_current_map_image();
}
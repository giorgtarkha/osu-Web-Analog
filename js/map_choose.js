let map_image_file_name = "background.jpg";

let current_map_image_container;

let init_map_choose = () => {
	current_map_image_container = document.getElementById("current-map-image-container");
}

let change_current_map_image = () => {
	current_map_image_container.src = songs_path + current_song + "/" + map_image_file_name;
}
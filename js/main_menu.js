let play_button;
let settings_button;
let exit_button;

const init_main_menu = () => {
	play_button = document.getElementById("main-menu-play-button");
	settings_button = document.getElementById("main-menu-settings-button");
	exit_button = document.getElementById("main-menu-exit-button");
	play_button.addEventListener("click", () => {
		load_map_choose_scene();
	});
	settings_button.addEventListener("click", () => {
		load_settings_scene();
	});
	exit_button.addEventListener("click", () => {
		load_initial_screen_scene();
	});
}
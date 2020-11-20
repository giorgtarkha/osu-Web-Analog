let play_button;
let setting_button;
let exit_button;

let init_main_menu = () => {
	play_button = document.getElementById("main-menu-play-button");
	setting_button = document.getElementById("main-menu-settings-button");
	exit_button = document.getElementById("main-menu-exit-button");
	exit_button.addEventListener("click", () => {
		load_initial_screen_scene();
	});
}
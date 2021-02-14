let pause_continue_button, pause_exit_button;

let init_pause = () => {
	pause_continue_button = document.getElementById("continue-game-button");
	pause_exit_button = document.getElementById("exit-game-button");
	
	pause_continue_button.addEventListener("click", () => {
		load_start_game_scene();
	});
	
	pause_exit_button.addEventListener("click", () => {
		load_map_choose_scene();
	});
}
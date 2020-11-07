let main_menu_scene = "main_menu";
let playing_game_scene = "playing_game";
let pause_game_scene = "pause_game";
let map_choose_scene = "map_choose";
let game_result_scene = "game_result";

let current_scene = main_menu_scene;

let game_screen;
let main_menu_screen;
let scenes;

let load_main_menu_scene = () => {
	if (current_scene == pause_game_scene   || 
	    current_scene == playing_game_scene || 
		current_scene == game_result_scene  || 
		current_scene == main_menu_scene) {
		reset_game();
		current_scene = main_menu_scene;
		load_scenes([main_menu_scene]);
	}
}

let load_pause_game_scene = () => {
	if (current_scene == playing_game_scene) {
		
	}
}

let load_start_game_scene = () => {
	if (current_scene == map_choose_scene) {
		game-screen.classList.remove(hidden_class_name);
	}
}

let load_scenes = (scene_names) => {
	for (const scene_name in scenes) {
		scenes[scene_name].classList.add(hidden_class_name);
	}
	scene_names.forEach((scene_name, index) => {
		scenes[scene_name].classList.remove(hidden_class_name);
	});
}

let init_scenes = () => {
	game_screen = document.getElementById("game-screen");
	main_menu_screen = document.getElementById("main-menu-screen");
	scenes = {
		main_menu : main_menu_screen,
		playing_game : game_screen
	};
}
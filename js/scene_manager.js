let initial_screen_scene = "initial";
let main_menu_scene = "main_menu";
let playing_game_scene = "playing_game";
let pause_game_scene = "pause_game";
let map_choose_scene = "map_choose";
let game_result_scene = "game_result";
let settings_scene = "settings";

let current_scene = initial_screen_scene;

let game_screen;
let main_menu_screen;
let initial_screen;
let settings_screen;
let scenes;

let load_initial_screen_scene = () => {
	if (current_scene == initial_screen_scene) {
		load_scenes([main_menu_scene, initial_screen_scene]);
	} else {
		initial_screen.classList.remove(hidden_class_name);
		current_scene = initial_screen_scene;
		initial_screen.classList.add("initial_screen_showing");
		setTimeout(() => {
			stop_playing_songs_with_volume_decrease();
			initial_screen.classList.remove("initial_screen_showing");
		}, 450);
	}
}

let load_main_menu_scene = () => {
	if (current_scene == pause_game_scene   || 
	    current_scene == playing_game_scene || 
		current_scene == game_result_scene) {
		reset_game();	
		current_scene = main_menu_scene;
		load_scenes([main_menu_scene]);
	} else if (current_scene == initial_screen_scene) {
		if (object_functions[main_song_player_object_name][song_stopping_volume_function_name] != undefined) {
			clearInterval(object_functions[main_song_player_object_name][song_stopping_volume_function_name]);
		}
		reset_played_songs();
		current_scene = main_menu_scene;
		initial_screen.classList.add("initial_screen_hiding");
		setTimeout(() => {
			play_random_song();
			initial_screen.classList.add(hidden_class_name);
			initial_screen.classList.remove("initial_screen_hiding");
		}, 450);
	} else if (current_scene == settings_scene) {
		current_scene = main_menu_scene;
		load_scenes([main_menu_scene]);
	}
}

let load_settings_scene = () => {
	if (current_scene == main_menu_scene) {
		current_scene = settings_scene;
		load_scenes([settings_scene]);
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
	initial_screen = document.getElementById("initial-screen");
	main_menu_screen = document.getElementById("main-menu-screen");
	game_screen = document.getElementById("game-screen");
	settings_screen = document.getElementById("settings-screen");
	initial_screen.addEventListener("click", () => {
		load_main_menu_scene();
	});
	scenes = {
		settings: settings_screen,
		initial: initial_screen,
		main_menu : main_menu_screen,
		playing_game : game_screen
	};
}
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
let map_choose_screen;
let pause_game_screen;
let game_result_screen;

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
	} else if (current_scene == settings_scene ||
	           current_scene == map_choose_scene) {
		current_scene = main_menu_scene;
		load_scenes([main_menu_scene]);
		add_song_controls();
	}
}

let load_settings_scene = () => {
	if (current_scene == main_menu_scene) {
		current_scene = settings_scene;
		load_scenes([settings_scene]);
	}
}

let load_map_choose_scene = () => {
	if (current_scene == main_menu_scene) {
		current_scene = map_choose_scene;
		load_scenes([map_choose_scene]);
		remove_song_controls();
		change_current_map_image();
	} else if (current_scene == pause_game_scene) {
		reset_game();	
		current_scene = map_choose_scene;
		load_scenes([map_choose_scene]);
		remove_song_controls();
		change_current_map_image();
		hide_gameplay_ui();
	}
}

let load_pause_game_scene = () => {
	if (current_scene == playing_game_scene) {
		current_scene = pause_game_scene;
		load_scenes([playing_game_scene, pause_game_scene]);
		remove_song_controls();
		pause_game();
		song_player.pause();
	}
}

let load_start_game_scene = () => {
	if (current_scene == map_choose_scene) {
		current_scene = playing_game_scene;
		load_scenes([playing_game_scene]);
		init_game();
		show_gameplay_ui();
	} else if (current_scene == pause_game_scene) {
		current_scene = playing_game_scene;
		load_scenes([playing_game_scene]);
		song_player.play();
		continue_game();
	}
}

let load_game_result_scene = () => {
	if (current_scene == playing_game_scene) {
		current_scene = game_result_scene();
		load_scenes([game_result_scene]);
		hide_gameplay_ui();
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
	map_choose_screen = document.getElementById("map-choose-screen");
	pause_game_screen = document.getElementById("pause-game-screen");
	game_result_screen = document.getElementById("game-result-screen");
	initial_screen.addEventListener("click", () => {
		load_main_menu_scene();
	});
	scenes = {
		settings: settings_screen,
		initial: initial_screen,
		main_menu : main_menu_screen,
		playing_game : game_screen,
		map_choose : map_choose_screen,
		pause_game : pause_game_screen,
		game_result : game_result_screen
	};
}
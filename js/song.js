let songs_path = "maps/";
let song_file_name = "song.mp3";
let song_names = ["ACDC - Back In Black",
			       "Arctic Monkeys - Knee Socks"];
let song_volume = 1.0;

let current_song;	
let current_song_index;
let song_player;			
let song_progress_bar;   
				   
let init_song_player = () => {
	song_player = document.getElementById("song-player");
	song_player.addEventListener("ended", () => {
		play_random_song();
	});
	song_progress_bar = document.getElementById("main-menu-player-progress-bar");
}

let play_random_song = () => {
	current_song_index = get_random_song_index();
	play_song(song_names[current_song_index]);
}

let play_song = (song_name) => {
	current_song = song_name;
	song_player.src = songs_path + current_song + "/" + song_file_name;
	song_player.volume = song_volume;
	
	song_progress_bar.max = song_player.duration;
	song_progress_bar.value = "0";
	if (object_functions[main_song_player_object_name][main_song_player_progress_update_function_name] != undefined) {
		clearInterval(object_functions[main_song_player_object_name][main_song_player_progress_update_function_name]);	
	}
	object_functions[main_song_player_object_name][main_song_player_progress_update_function_name] = setInterval(update_playing_song_progress, 500);
	
	song_player.play();
}

let pause_song = () => {
	song_player.pause();
}

let continue_song = () => {
	song_player.play();
}

let stop_song = () => {
	song_player.pause();
	song_player.currentTime = 0;
}

let change_playing_song_progress = () => {
	if (object_functions[main_song_player_object_name][main_song_player_progress_update_function_name] != undefined) {
		clearInterval(object_functions[main_song_player_object_name][main_song_player_progress_update_function_name]);	
	}
	song_player.currentTime = song_progress_bar.value;
	object_functions[main_song_player_object_name][main_song_player_progress_update_function_name] = setInterval(update_playing_song_progress, 500);
}

let update_playing_song_progress = () => {
	song_progress_bar.max = song_player.duration;
	song_progress_bar.value = song_player.currentTime;
}

let get_random_song_index = () => {
	return Math.floor(Math.random() * song_names.length);
}
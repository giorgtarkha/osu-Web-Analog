let songs_path = "maps/";
let pause_icon_image_name = "pause.png";
let play_icon_image_name = "play.png";
let song_file_name = "song.mp3";
let song_names = ["Attack On Titan OP1"];
let played_songs = [];
let song_volume = 0.5;
let current_song_pointer = 0;

let current_song;	
let current_song_index;
let song_player;			
let song_player_song_name;   
let next_button;
let previous_button;
let pause_button;
				   
let init_song_player = () => {
	song_player = document.getElementById("song-player");
	next_button = document.getElementById("main-menu-player-next-song-button");
	previous_button = document.getElementById("main-menu-player-previous-song-button");
	pause_button = document.getElementById("main-menu-player-pause-song-button");
	song_player_song_name = document.getElementById("main-menu-player-song-name");
	song_player.addEventListener("ended", () => {
		play_random_song();
	});
	next_button.addEventListener("click", () => {
		current_song_pointer++;
		if (current_song_pointer == played_songs.length) {
			play_random_song();
		} else {
			play_song(song_names[played_songs[current_song_pointer]]);
		}
	});
	previous_button.addEventListener("click", () => {
		if (current_song_pointer > 0) {
			current_song_pointer--;
			play_song(song_names[played_songs[current_song_pointer]]);
		}
	});
	pause_button.addEventListener("click", () => {
		if (song_player.paused) {
			pause_button.childNodes[0].src = asset_files_path + pause_icon_image_name;
			song_player.play();
		} else {
			pause_button.childNodes[0].src = asset_files_path + play_icon_image_name;
			song_player.pause();
		}
	});
}

let play_random_song = () => {
	current_song_index = get_random_song_index();
	played_songs.push(current_song_index);
	play_song(song_names[current_song_index]);
	next_button.classList.remove("hidden");
	previous_button.classList.remove("hidden");
	pause_button.classList.remove("hidden");
}

let play_song = (song_name) => {
	pause_button.childNodes[0].src = asset_files_path + pause_icon_image_name;
	current_song = song_name;
	song_player.src = songs_path + current_song + "/" + song_file_name;
	song_player.volume = song_volume;
	song_player_song_name.innerHTML = current_song;
	song_player.addEventListener('loadedmetadata', () => {
		song_player.currentTime = Math.floor(song_player.duration / 2);
		song_player.play();
	});
}

let get_random_song_index = () => {
	return Math.floor(Math.random() * song_names.length);
}

let reset_played_songs = () => {
	played_songs = [];
	current_song_pointer = 0;
}

let stop_playing_songs_with_volume_decrease = () => {
	object_functions[main_song_player_object_name][song_stopping_volume_function_name] = setInterval(() => {
		if (song_player.volume <= 0.001) {
			stop_playing_songs();
			clearInterval(object_functions[main_song_player_object_name][song_stopping_volume_function_name]);
			object_functions[main_song_player_object_name][song_stopping_volume_function_name] = undefined;
		}
		song_player.volume = Math.max(0, song_player.volume - song_player.volume / 100);
	}, 10);
}

let stop_playing_songs = () => {
	song_player.pause();
	song_player_song_name.innerHTML = "";
	next_button.classList.add(hidden_class_name);
	previous_button.classList.add(hidden_class_name);
	pause_button.classList.add(hidden_class_name);
}
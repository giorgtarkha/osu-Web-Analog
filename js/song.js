let songs_path = "maps/";
let song_file_name = "song.mp3";
let song_names = ["ACDC - Back In Black",
			       "Arctic Monkeys - Knee Socks"];
let song_volume = 1.0;

let current_song;	
let song_player;			   
				   
let init_song_player = () => {
	song_player = document.getElementById("song-player");
}

let change_song = () => {
	current_song = song_names[get_random_song_index()];
	song_player.src = songs_path + current_song + "/" + song_file_name;
	song_player.volume = song_volume;
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

let get_random_song_index = () => {
	return Math.floor(Math.random() * song_names.length);
}
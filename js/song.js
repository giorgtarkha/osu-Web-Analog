let songs_path = "maps/";
let song_file_name = "song.mp3";
let song_names = ["ACDC - Back In Black",
			       "Arctic Monkeys - Knee Socks"];
let song_volume = 1.0;

let current_song;	
let current_song_index;
let song_player;			
let song_player_song_name;   
				   
let init_song_player = () => {
	song_player = document.getElementById("song-player");
	song_player.addEventListener("ended", () => {
		play_random_song();
	});
	song_player_song_name = document.getElementById("main-menu-player-song-name");
}

let play_random_song = () => {
	current_song_index = get_random_song_index();
	play_song(song_names[current_song_index]);
}

let play_song = (song_name) => {
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
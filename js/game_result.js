let max_combo_result;
let three_hundred_result;
let one_hundred_result;
let fifty_result;
let miss_result;
let result_retry_button;
let result_menu_button;

let update_result = () => {
	max_combo_result.innerHTML = "Max Combo: " + max_combo;
	three_hundred_result.innerHTML = "Three Hundreds: " + three_hundred_count;
	one_hundred_result.innerHTML = "One Hundreds: " + one_hundred_count;
	fifty_result.innerHTML = "Fifties: " + fifty_count;
	miss_result.innerHTML = "Misses: " + miss_count;
}

let init_result = () => {
	max_combo_result = document.getElementById("max-combo-result");
	three_hundred_result = document.getElementById("three-hundred-result");
	one_hundred_result = document.getElementById("one-hundred-result");
	fifty_result = document.getElementById("fifty-result");
	miss_result = document.getElementById("miss-result");	
	result_menu_button = document.getElementById("result-menu-button");
	result_retry_button = document.getElementById("result-retry-button");
	
	result_menu_button.addEventListener("click", (e) => {
		load_map_choose_scene();
	});
	
	result_retry_button.addEventListener("click", (e) => {
		load_start_game_scene();
	});
}
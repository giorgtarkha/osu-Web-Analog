let early_click_point = 20;
let fifty_click_point = 15;
let hundred_click_point = 10;
let three_hundred_click_point = 0;
let miss_point = 0;
let mouse_x = 0, mouse_y = 0;
let destroyed_objects = new Set();
let last_object_id = 0;

let game_screen;

let handleClick = (x, y) => {
	let elements = document.elementsFromPoint(x, y);
	let current_element = null;
	let current_element_object_id = null;
	let current_element_object_type = null;
	for (let i = 0; i < elements.length; i++) {
		let id = elements[i].id;		
		if (id == undefined || !id.includes("_")) {
			continue;
		}
		let object_type = id.substring(0, id.indexOf("_"));
		let object_id = parseInt(id.substring(id.indexOf("_") + 1, id.length));
		if (object_type == circle_object_prefix) {
			if (current_element_object_id == null || current_element_object_id > object_id) {
				current_element_object_id = object_id;
				current_element_object_type = object_type;
				current_element = elements[i];
			}
		}
	}
	if (current_element != undefined) {
		if (current_element_object_type == circle_object_prefix) {
			try_to_destroy_circle(current_element);
		}
	}
};

let reset_game = () => {
	last_object_id = 0;
	object_functions = {};
};
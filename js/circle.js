let radius = 40;
let outline_radius_addition = 60;
let outline_radius_decrease = 1;
let outline_radius_decrease_rate = 20;
let opacity_increase = 0.04;
let opacity_increase_rate = 20;
let destroy_opacity_decrease = 0.1;
let destroy_opacity_decrease_rate = 20;
let destroy_radius_increase = 2;

let spawn_circle = (x, y) => {	
	create_circle_internal(x, y, radius);
}

let create_circle_internal = (x, y, r) => {	
	let current_object_id = last_object_id;
	game_object_functions[current_object_id] = {};

	let circle = document.createElementNS(svg_path, "circle");
	circle.setAttributeNS(null, 'id', circle_object_prefix + "_" + current_object_id);
	circle.setAttributeNS(null, 'cx', x);
	circle.setAttributeNS(null, 'cy', y);
	circle.setAttributeNS(null, 'r', r);
	circle.setAttributeNS(null, 'style', 'fill: white; stroke: red; stroke-width: 3px; opacity: 0;');
	let outline = document.createElementNS(svg_path, "circle");
	outline.setAttributeNS(null, 'id', circle_outline_object_prefix + "_" + current_object_id);
	outline.setAttributeNS(null, 'cx', x);
	outline.setAttributeNS(null, 'cy', y);
	outline.setAttributeNS(null, 'r', r + outline_radius_addition);
	outline.setAttributeNS(null, 'style', 'fill: none; stroke: green; stroke-width: 3px; opacity: 0;');
	
	start_outline_function(circle, outline, current_object_id, radius);
	start_spawn_opacity_function(circle, outline, current_object_id);
	
	if (current_object_id == 0) {
		game_screen.appendChild(circle);
	} else {
		game_screen.insertBefore(circle, game_screen.firstChild);
	}	
	game_screen.appendChild(outline);
	last_object_id++;
}

let start_outline_function = (circle, outline, id, r) => {
	game_object_functions[id][outline_function_name] = setInterval(() => {
		let radius_now = parseInt(outline.getAttributeNS(null, 'r'));
		outline.setAttributeNS(null, 'r', radius_now - outline_radius_decrease);
		if (radius_now < r - miss_point) {
			destroy_circle_internal(circle, outline, id, true);
			clearInterval(game_object_functions[id][outline_function_name]);
		}
	}, outline_radius_decrease_rate);
}

let start_spawn_opacity_function = (circle, outline, id) => {
	game_object_functions[id][spawn_opacity_function_name] = setInterval(() => {
		let opacity_now_circle = circle.style.opacity;
		circle.style.opacity = Math.min(1, parseFloat(opacity_now_circle) + opacity_increase);
		let opacity_now_outline = outline.style.opacity;
		outline.style.opacity = Math.min(1, parseFloat(opacity_now_outline) + opacity_increase);
		if (circle.style.opacity == 1 && outline.style.opacity == 1) {
			clearInterval(game_object_functions[id][spawn_opacity_function_name]);
		}
	}, opacity_increase_rate);
}

let try_to_destroy_circle = (circle) => {
	let id = parseInt(circle.id.substring(circle.id.indexOf("_") + 1, circle.id.length));
	
	if (destroyed_objects.has(id)) {
		return { destroyed : false };
	}
	
	let outline = document.getElementById("outline_" + id);
	let radius_outline_now = parseInt(outline.getAttributeNS(null, 'r'));
	let radius_circle_now = parseInt(circle.getAttributeNS(null, 'r'));
	
	let diff = Math.abs(radius_outline_now - radius_circle_now);
	if (radius_outline_now >= radius_circle_now) {
		if (diff >= early_click_point) {
			shake_circle_internal(circle, id);
			return { destroyed : false };
		} else if (diff >= fifty_click_point) {
			destroy_circle_internal(circle, outline, id, false);
			return { destroyed : true, score : 50, miss : false };
		} else if (diff >= hundred_click_point) {
			destroy_circle_internal(circle, outline, id, false);
			return { destroyed : true, score : 100, miss : false };
		} else {
			destroy_circle_internal(circle, outline, id, false);
			return { destroyed : true, score : 300, miss : false };
		}
	} else {
		if (diff <= miss_point) {
			destroy_circle_internal(circle, outline, id, false);
			return { destroyed : true, score : 300, miss : false };
		} else {
			destroy_circle_internal(circle, outline, id, true);
			return { destroyed : true, miss : true };
		}
	}
}

let destroy_circle_internal = (circle, outline, id, miss) => {
	if (miss) {
		
	} else {
		successful_click_audio.pause();
		successful_click_audio.currentTime = 0;
		successful_click_audio.play();
	}
	start_destroy_circle_function(circle, outline, id);
	destroyed_objects.add(id);
}

let start_destroy_circle_function = (circle, outline, id) => {
	game_object_functions[id][destroy_function_name] = setInterval(() => {
		let opacity_now_circle = circle.style.opacity;
		circle.style.opacity = Math.max(0, parseFloat(opacity_now_circle) - destroy_opacity_decrease);
		let opacity_now_outline = outline.style.opacity;
		outline.style.opacity = Math.max(0, parseFloat(opacity_now_outline) - destroy_opacity_decrease);
		let radius_now_circle = parseInt(circle.getAttributeNS(null, 'r'));
		circle.setAttributeNS(null, 'r', radius_now_circle + destroy_radius_increase);
		if (circle.style.opacity == 0 && outline.style.opacity == 0) {
			circle.remove();
			outline.remove();
			clearInterval(game_object_functions[id][destroy_function_name]);
		}
	}, destroy_opacity_decrease_rate);
}

let shake_circle_internal = (circle, id) => {
	circle.classList.remove(shaky_circle_class_name);
	circle.classList.add(shaky_circle_class_name);
	if (game_object_functions[id][shake_function_name] != undefined) {
		clearTimeout(game_object_functions[id][shake_function_name]);
	}
	game_object_functions[id][shake_function_name] = setTimeout(() => { circle.classList.remove(shaky_circle_class_name); }, 110);
}

let pause_existing_circles = () => {
	let existing_circles = [...document.getElementsByTagName('circle')];
	let existing_object_ids = new Set();
	for (let i = 0; i < existing_circles.length; i++) {
		existing_object_ids.add(existing_circles[i].id.substring(existing_circles[i].id.indexOf('_') + 1));
	}
	for (let existing_object_id of existing_object_ids) {
		if (game_object_functions[existing_object_id][destroy_function_name] != undefined) {
			clearInterval(game_object_functions[existing_object_id][destroy_function_name]);
			game_object_functions[existing_object_id][destroy_function_name] = true;
		}
		if (game_object_functions[existing_object_id][outline_function_name] != undefined) {
			clearInterval(game_object_functions[existing_object_id][outline_function_name]);
			game_object_functions[existing_object_id][outline_function_name] = true;
		}
		if (game_object_functions[existing_object_id][spawn_opacity_function_name] != undefined) {
			clearInterval(game_object_functions[existing_object_id][spawn_opacity_function_name]);
			game_object_functions[existing_object_id][spawn_opacity_function_name] = true;
		}
	}
}

let continue_existing_circles = () => {
	let existing_circles = [...document.getElementsByTagName('circle')];
	let existing_object_ids = new Set();
	for (let i = 0; i < existing_circles.length; i++) {
		existing_object_ids.add(existing_circles[i].id.substring(existing_circles[i].id.indexOf('_') + 1));
	}
	for (let existing_object_id of existing_object_ids) {
		if (game_object_functions[existing_object_id][destroy_function_name] != undefined) {
			start_destroy_circle_function(document.getElementById(circle_object_prefix + "_" + existing_object_id), document.getElementById(circle_outline_object_prefix + "_" + existing_object_id), existing_object_id);
		}
		if (game_object_functions[existing_object_id][outline_function_name] != undefined) {
			start_outline_function(document.getElementById(circle_object_prefix + "_" + existing_object_id), document.getElementById(circle_outline_object_prefix + "_" + existing_object_id), existing_object_id, radius);
		}
		if (game_object_functions[existing_object_id][spawn_opacity_function_name] != undefined) {
			start_spawn_opacity_function(document.getElementById(circle_object_prefix + "_" + existing_object_id), document.getElementById(circle_outline_object_prefix + "_" + existing_object_id), existing_object_id);
		}
	}
}


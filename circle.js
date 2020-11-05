let spawn_circle = (x, y) => {	
	create_circle_internal(x, y, radius);
}

let create_circle_internal = (x, y, r) => {	
	let current_object_id = last_object_id;
	object_functions[current_object_id] = {};

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
	
	object_functions[current_object_id][spawn_opacity_function_name]	= setInterval(() => {
		let opacity_now_circle = circle.style.opacity;
		circle.style.opacity = Math.min(1, parseFloat(opacity_now_circle) + opacity_increase);
		let opacity_now_outline = outline.style.opacity;
		outline.style.opacity = Math.min(1, parseFloat(opacity_now_outline) + opacity_increase);
		if (circle.style.opacity == 1 && outline.style.opacity == 1) {
			clearInterval(object_functions[current_object_id][spawn_opacity_function_name]);
		}
	}, opacity_increase_rate);
	
	object_functions[current_object_id][outline_function_name] = setInterval(() => {
		let radius_now = parseInt(outline.getAttributeNS(null, 'r'));
		outline.setAttributeNS(null, 'r', radius_now - outline_radius_decrease);
		if (radius_now < r - miss_point) {
			destroy_circle_internal(circle, outline, current_object_id, null);
			clearInterval(object_functions[current_object_id][outline_function_name]);
		}
	}, outline_radius_decrease_rate);
	
	if (current_object_id == 0) {
		game_screen.appendChild(circle);
	} else {
		game_screen.insertBefore(circle, game_screen.firstChild);
	}	
	game_screen.appendChild(outline);
	last_object_id++;
}

let try_to_destroy_circle = (circle) => {
	let id = parseInt(circle.id.substring(circle.id.indexOf("_") + 1, circle.id.length));
	
	if (destroyed_objects.has(id)) {
		return {};
	}
	
	let outline = document.getElementById("outline_" + id);
	let radius_outline_now = parseInt(outline.getAttributeNS(null, 'r'));
	let radius_circle_now = parseInt(circle.getAttributeNS(null, 'r'));
	
	let diff = Math.abs(radius_outline_now - radius_circle_now);
	if (radius_outline_now >= radius_circle_now) {
		if (diff >= early_click_point) {
			shake_circle_internal(circle, id);
			return {};
		} else if (diff >= fifty_click_point) {
			destroy_circle_internal(circle, outline, id, false);
			return {  }
		} else if (diff >= hundred_click_point) {
			destroy_circle_internal(circle, outline, id, false);
		} else {
			destroy_circle_internal(circle, outline, id, false);
		}
	} else {
		if (diff <= miss_point) {
			destroy_circle_internal(circle, outline, id, false);
		} else {
			destroy_circle_internal(circle, outline, id, true);
		}
	}
}

let destroy_circle_internal = (circle, outline, id, miss) => {
	object_functions[id][destroy_function_name] = setInterval(() => {
		let opacity_now_circle = circle.style.opacity;
		circle.style.opacity = Math.max(0, parseFloat(opacity_now_circle) - destroy_opacity_decrease);
		let opacity_now_outline = outline.style.opacity;
		outline.style.opacity = Math.max(0, parseFloat(opacity_now_outline) - destroy_opacity_decrease);
		let radius_now_circle = parseInt(circle.getAttributeNS(null, 'r'));
		circle.setAttributeNS(null, 'r', radius_now_circle + destroy_radius_increase);
		if (circle.style.opacity == 0 && outline.style.opacity == 0) {
			circle.remove();
			outline.remove();
			clearInterval(object_functions[id][destroy_function_name]);
		}
	}, destroy_opacity_decrease_rate);
	destroyed_objects.add(id);
	return true;
}

let shake_circle_internal = (circle, id) => {
	circle.classList.remove(shaky_circle_class_name);
	circle.classList.add(shaky_circle_class_name);
	if (object_functions[id][shake_function_name] != undefined) {
		clearTimeout(object_functions[id][shake_function_name]);
	}
	object_functions[id][shake_function_name] = setTimeout(() => { circle.classList.remove(shaky_circle_class_name); }, 110);
}


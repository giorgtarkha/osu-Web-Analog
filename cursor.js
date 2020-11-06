let trail_particles = [];
let trail_particle_size_diff = 6;
let trail_particle_diff_speed = 0.8;

let cursor;
let trail_image_offset;


let init_cursor = () => {
	cursor = document.getElementById("cursor");
	cursor.onload = () => {
		cursor_image_offset = cursor.width / 2;
		window.addEventListener("mousemove", (e) => {
			mouse_x = e.pageX;
			mouse_y = e.pageY;
			update_cursor();
		});
	}
	cursor.src = cursor_image_file_name;
};

let update_cursor = () => {
	let real_position_x = mouse_x - cursor_image_offset, real_position_y = mouse_y - cursor_image_offset;
	cursor.style.left = real_position_x;
	cursor.style.top = real_position_y;
	if (cursor_has_trail && object_functions[cursor_object_name][cursor_trail_animation_function_name] == undefined) {
		start_trail_animation();
	}
};

let start_trail_animation = () => {
	object_functions[cursor_object_name][cursor_trail_animation_function_name] = setInterval(() => {
		if (trail_particles.length == 0) {
			for (let i = 0; i < trail_particle_number; i++) {
				trail_particles.push(create_trail_particle(i));
			}
		}
		let x = mouse_x - trail_particles[0].width / 2 - trail_particle_size_diff / 2, y = mouse_y - trail_particles[0].width / 2 - trail_particle_size_diff / 2;
		for (let i = 0; i < trail_particle_number; i++) {
			let next = trail_particles[i + 1] || trail_particles[0];
			trail_particles[i].style.left = x + trail_particle_size_diff / 2 + i - trail_particle_size_diff / 2;
			trail_particles[i].style.top = y + trail_particle_size_diff / 2 + i - trail_particle_size_diff / 2;
			x += (next.offsetLeft - trail_particles[i].offsetLeft) * trail_particle_diff_speed;
			y += (next.offsetTop - trail_particles[i].offsetTop) * trail_particle_diff_speed;
		}
	}, 10);
};

let create_trail_particle = (num) => {
	let trail_particle = document.createElement("img");
	trail_particle.onload = () => {
		trail_particle.width = trail_particle.width - num * trail_particle_size_diff;
	}
	trail_particle.src = cursor_trail_image_file_name;
	trail_particle.classList.add("cursor_particle");
	document.body.insertBefore(trail_particle, game_screen);
	return trail_particle;
}
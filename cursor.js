let cursor_name = "cursor";

let cursor;
let cursor_image_offset;
let cursor_fixed;
let cursor_has_trail;

let init_cursor = () => {
	cursor = document.getElementById("cursor");
	cursor.onload = () => {
		cursor_image_offset = cursor.width / 2;
	}
	cursor.src = cursor_image_file_name;
};
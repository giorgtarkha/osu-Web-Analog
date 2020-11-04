let spawn_circle = () => {
	console.log("Circle Created");
	create_circle_internal(100, 100, 20);
	create_circle_internal(100, 100, 20);
}

let create_circle_internal = (x, y, r) => {	
	let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circle.setAttributeNS(null, 'cx', x);
	circle.setAttributeNS(null, 'cy', y);
	circle.setAttributeNS(null, 'r', r);
	circle.setAttributeNS(null, 'style', 'fill: white; stroke: blue; stroke-width: 1px;' );
	document.getElementById("game-screen").appendChild(circle);
}
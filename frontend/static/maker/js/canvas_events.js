
var elementChanged = new Event('elementChanged'),
	elements = [],
	canvas = document.getElementById("myCanvas"),
	ctx = canvas.getContext("2d");

canvas.addEventListener('elementChanged', function () {
	for (i = 0; i < elements.length; i++) {
		var el = elements[i];
		ctx.drawImage(el.img, el.x, el.y, el.width, el.height);
	}
});
canvas.addEventListener('click', function(event) {
    var x = (event.pageX - canvas.offsetLeft)/canvas.clientWidth*canvas.width,
        y = (event.pageY - canvas.offsetTop)/canvas.clientHeight*canvas.height;
	//alert(x.toString() + " " + y.toString());
	
	for (i = elements.length-1; i >= 0; i--) {
		var el = elements[i];
		if (el.x < x &&  x < el.x+el.width && el.y < y && y < el.y + el.height) {
			el.onclick(event);
			break;
		}
	}
});
var mainelem = new ImageElement(new Image(), 0, 0, 1920, 1080);
mainelem.images = ["/static/maker/images/MainBoard1.png"];
mainelem.onclick = function (event) {};
elements.push(mainelem);
mainelem.setImage(0);

var powerwheel = new ImageElement(new Image(), 1920-370, 1080-370, 370, 370);
powerwheel.images = ["/static/maker/images/power_wheel_disabled.png", "/static/maker/images/power_wheel_active.png"];
powerwheel.onclick = function (event) {
	if (this.state == 0) {
		this.setImage(1);
	} else {
		this.setImage(0);
	}
};
elements.push(powerwheel);
powerwheel.setImage(1);

function ImageElement(img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.state = 0;
	this.setImage = function (state) {
		this.state = state;
		this.img.src = this.images[state];
		this.img.onload = function () {
			canvas.dispatchEvent(elementChanged);
		};
	};
}

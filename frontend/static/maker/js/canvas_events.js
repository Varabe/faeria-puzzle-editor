
$(document).ready( function () {
	
	var elementChanged = new Event('elementChanged'),
		//textChanged = new Event('textChanged'),
		elements = [], textelements = [],
		canvas = document.getElementById("myCanvas"),
		ctx = canvas.getContext("2d");

	canvas.addEventListener('elementChanged', function () {
		for (i = 0; i < elements.length; i++) {
			var el = elements[i];
			ctx.drawImage(el.img, el.x, el.y, el.width, el.height);
		}
		for (i = 0; i < textelements.length; i++) {
			var el = textelements[i];
			ctx.font = el.font;
			ctx.shadowColor = "black";
			ctx.shadowOffsetX = 5; 
			ctx.shadowOffsetY = 5; 
			ctx.shadowBlur = 7;
			if (typeof el.color !== 'undefined') {
				ctx.fillStyle = el.color;
			} else {
				ctx.fillStyle = 'white';
			}
			ctx.textAlign = "center";
			ctx.fillText(el.text, el.x + el.width/2, el.y + el.height*2/3);
		}
	});

	canvas.addEventListener('click', function(event) {
		var x = (event.pageX - canvas.offsetLeft)/canvas.clientWidth*canvas.width,
			y = (event.pageY - canvas.offsetTop)/canvas.clientHeight*canvas.height;
		//alert(x.toString() + " " + y.toString());
		for (i = textelements.length-1; i >= 0; i--) {
			var el = textelements[i];
			if (el.x < x &&  x < el.x+el.width && el.y < y && y < el.y + el.height) {
				el.onclick(event);
				break;
			}
		}
		for (i = elements.length-1; i >= 0; i--) {
			var el = elements[i];
			if (el.x < x &&  x < el.x+el.width && el.y < y && y < el.y + el.height) {
				el.onclick(event);
				break;
			}
		}
	});
	var mainelem = new ImageElement(0, 0, 1920, 1080);
	mainelem.images = [document.getElementById("main")];
	mainelem.onclick = function (event) {};
	elements.push(mainelem);
	mainelem.setImage(0);
	var powerwheel = new ImageElement(1920-370, 1080-370, 370, 370);
	powerwheel.images = [document.getElementById("pw_disabled"), document.getElementById("pw_active")];
	powerwheel.onclick = function (event) {
		if (this.state == 0) {
			this.setImage(1);
		} else {
			this.setImage(0);
		}
	};
	elements.push(powerwheel);
	powerwheel.setImage(1);

	var nickname1 = new TextElement("18px Libre Baskerville", 85, 1017, 142, 30);
	nickname1.color = 'white';
	nickname1.onclick = function (event) {
		$('#myTab a[href="#general"]').tab('show');
		$('#form_name').focus();
	};
	textelements.push(nickname1);
	$('#form_name').on('input', function (event) {
		nickname1.setText($('#form_name').val());
	});

	var nickname2 = new TextElement("18px Libre Baskerville", 76, 34, 142, 30);
	nickname1.color = 'white';
	nickname2.onclick = function (event) {
		$('#myTab a[href="#general"]').tab('show');
		$('#form_name2').focus();
	};
	textelements.push(nickname2);
	$('#form_name2').on('input', function (event) {
		nickname2.setText($('#form_name2').val());
	});
	function ImageElement(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.state = 0;
		this.setImage = function (state) {
			this.state = state;
			this.img = this.images[state];
			canvas.dispatchEvent(elementChanged);
		};
	}
	function TextElement(font, x, y, w, h) {
		this.font = font;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.text = "";
		this.setText = function (text) {
			this.text = text;
			canvas.dispatchEvent(elementChanged);
		};
	}
});
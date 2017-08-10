
$(document).ready( function () {
	
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
		this.tab = "";
		this.textfield = "";
		this.setText = function (text) {
			this.text = text;
			canvas.dispatchEvent(elementChanged);
		};
		//onclick switch focus to the text field
		this.onclick = function (event) {
			$(this.tab).tab('show');
			$(this.textfield).focus();
		};
	}
	
	var elementChanged = new Event('elementChanged'),
		//textChanged = new Event('textChanged'),
		elements = [], textelements = [],
		canvas = document.getElementById("myCanvas"),
		ctx = canvas.getContext("2d");

	//redraw everything
	canvas.addEventListener('elementChanged', function () {
		for (i = 0; i < elements.length; i++) {
			var el = elements[i];
			ctx.drawImage(el.img, el.x, el.y, el.width, el.height);
		}
		for (i = 0; i < textelements.length; i++) {
			var el = textelements[i];
			ctx.font = el.font;
			//ctx.shadowColor = "black";
			//ctx.shadowOffsetX = 5; 
			//ctx.shadowOffsetY = 5; 
			//ctx.shadowBlur = 7;
			if (typeof el.color !== 'undefined') {
				ctx.fillStyle = el.color;
			} else {
				ctx.fillStyle = 'white';
			}
			ctx.textAlign = "center";
			ctx.fillText(el.text, el.x + el.width/2, el.y + el.height*2/3);
		}
	});

	//find element that was clicked
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
	
	//main background image
	var mainelem = new ImageElement(0, 0, 1920, 1080);
	mainelem.images = [document.getElementById("main")];
	mainelem.onclick = function (event) {};
	elements.push(mainelem);
	mainelem.setImage(0);
	
	//Power Wheel
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
	powerwheel.setImage(0);

	//Your Nickname
	var nickname1 = new TextElement("bold 18px Libre Baskerville", 85, 1017, 142, 30);
	nickname1.color = 'white';
	nickname1.tab = '#myTab a[href="#general"]';
	nickname1.textfield = '#form_name';
	textelements.push(nickname1);
	//on input redraw text
	$('#form_name').on('input', function (event) {
		nickname1.setText($('#form_name').val());
	});
	
	//Opponent's Nickname
	var nickname2 = new TextElement("bold 18px Libre Baskerville", 76, 34, 142, 30);
	nickname2.color = 'white';
	nickname2.tab = '#myTab a[href="#general"]';
	nickname2.textfield = '#form_name2';
	textelements.push(nickname2);
	//on input redraw text
	$('#form_name2').on('input', function (event) {
		nickname2.setText($('#form_name2').val());
	});
	
	//Your Faeria
	var faeria1 = new TextElement("bold 44px Libre Baskerville", 110, 891, 95, 95);
	faeria1.color = "black";
	faeria1.tab = '#myTab a[href="#general"]';
	faeria1.textfield = '#form_faeria';
	textelements.push(faeria1);
	//on input redraw text
	$('#form_faeria').on('input', function (event) {
		faeria1.setText($('#form_faeria').val());
	});
	
	//Opponent's Faeria
	var faeria2 = new TextElement("bold 44px Libre Baskerville", 103, 95, 95, 95);
	faeria2.color = "black";
	faeria2.tab = '#myTab a[href="#general"]';
	faeria2.textfield = '#form_faeria2';
	textelements.push(faeria2);
	//on input redraw text
	$('#form_faeria2').on('input', function (event) {
		faeria2.setText($('#form_faeria2').val());
	});
	
});
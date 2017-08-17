

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
	this.draw = function (ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
	this.align = "center";
	this.setText = function (text) {
		this.text = text;
		canvas.dispatchEvent(elementChanged);
	};
	//onclick switch focus to the text field
	this.onclick = function (event) {
		if ($(this.tab).parent().hasClass("active")){
			$(this.textfield).focus();
		} else {
			$(this.tab).tab('show');
			var tf = this.textfield;
			$('#myTab').one('shown.bs.tab', function() {
				$(tf).focus();
			});
		}
	};
	this.draw = function (ctx) {
		ctx.font = this.font;
		//ctx.shadowColor = "black";
		//ctx.shadowOffsetX = 5; 
		//ctx.shadowOffsetY = 5; 
		//ctx.shadowBlur = 7;
		if (typeof this.color !== 'undefined') {
			ctx.fillStyle = this.color;
		} else {
			ctx.fillStyle = 'white';
		}
		ctx.textAlign = this.align;
		ctx.fillText(this.text, this.x + this.width/2, this.y + this.height*2/3);
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
		el.draw(ctx);
	}
	for (i = 0; i < textelements.length; i++) {
		var el = textelements[i];
		el.draw(ctx);
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
var powerwheel = new ImageElement(1550, 710, 370, 370);
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

//Hand
var hand = new ImageElement(370, 810 ,1180, 270);
hand.onclick = function (event) {
	$('#myTab a[href="#hand"]').tab('show');
};
hand.draw = function (ctx) {
	var len = $('#img_list img').length,
		reswidth = 300,
		dx = 100 + 10*len,
		totalwidth = (len-1)*(reswidth-dx) + reswidth,
		start = hand.x + hand.width/2 - totalwidth/2;
	$('#img_list img').each(function( index ) {
		ctx.drawImage(this, start + (reswidth-dx)*index, hand.y, reswidth, this.height*reswidth/this.width);
	});
};
elements.push(hand);

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
nickname1.setText($('#form_name').val());

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
nickname2.setText($('#form_name2').val());

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
faeria1.setText($('#form_faeria').val());

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
faeria2.setText($('#form_faeria2').val());

var decksize1 = new TextElement("bold 16px Libre Baskerville", 103, 1052, 55, 25);
decksize1.color = "white";
decksize1.tab = '#myTab a[href="#general"]';
decksize1.textfield = '#form_decksize';
decksize1.align = 'left';
textelements.push(decksize1);
//on input redraw text
$('#form_decksize').on('input', function (event) {
	decksize1.setText($('#form_decksize').val());
});
decksize1.setText($('#form_decksize').val());

var decksize2 = new TextElement("bold 16px Libre Baskerville", 96, 5, 55, 25);
decksize2.color = "white";
decksize2.tab = '#myTab a[href="#general"]';
decksize2.textfield = '#form_decksize2';
decksize2.align = 'left';
textelements.push(decksize2);
//on input redraw text
$('#form_decksize2').on('input', function (event) {
	decksize2.setText($('#form_decksize2').val());
});
decksize2.setText($('#form_decksize2').val());


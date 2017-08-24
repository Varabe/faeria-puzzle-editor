

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
function LandCounterElement(font, lt, side, x, y, w, h) {
	this.font = font;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.land_type = lt;
	this.side = side;
	this.draw = function (ctx) {
		var counter = 0, land_type = this.land_type, side = this.side;
		LandList.forEach( function(item, i, arr) {
			if (LandArray[item].type == land_type && LandArray[item].side == side) {
				counter++;
			}
		});
		if (counter != 0) {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.align = "center";
			ctx.fillText(counter, this.x + this.width/2, this.y + this.height-9);
		}
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
		ctx.strokeStyle = this.strokeColor;
		ctx.lineWidth = 3;
		ctx.strokeText(this.text, this.x + this.width/2, this.y + this.height*2/3);
		ctx.fillStyle = this.color;
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
			return;
		}
	}
	for (i = elements.length-1; i > 0; i--) { //not >= 0 elements[0] is the MainBoard1.png
		var el = elements[i];
		if (el.x < x &&  x < el.x+el.width && el.y < y && y < el.y + el.height) {
			el.onclick(event);
			return;
		}
	}
	//Board
	if (495 < x && x < 1391 && 169 < y && y < 766) {
		$('#myTab a[href="#lands"]').tab('show');
		var	nx, ny,
			px = x - LandConst.x0, py = y - LandConst.y0;
		nx = Math.floor(px/LandConst.dx);
		ny = Math.floor(py/LandConst.dy1);
		if (px < 0) {
			nx--;
		}
		px = px - nx*LandConst.dx;
		py = py - ny*LandConst.dy1;
		if (Math.floor(px/LandConst.dx1) != 0) { //point in triangle
			px = px - LandConst.dx1;
			if ((ny + nx%2)% 2== 0) {
				if (py > px * LandConst.dy1/LandConst.dx2) { //lower triangle
					
				} else { //upper triangle
					nx++;
				}
			} else {
				if (py > LandConst.dy1 - px * LandConst.dy1/LandConst.dx2) { //lower triangle
					nx++;
				} else { //upper triangle
					
				}
			}
		}
		var res, letter, number, d;
		switch(nx) {
			case 0: letter = "A"; d = 0; break;
			case 1: letter = "B"; d = 0; break;
			case 2: letter = "C"; d = 1; break;
			case 3: letter = "D"; d = 1; break;
			case 4: letter = "E"; d = 1; break;
			case 5: letter = "F"; d = 0; break;
			case 6: letter = "G"; d = 0 ;break;
			default: letter = "Z"; break;
		}
		if (nx % 2 == 0) {
			number = Math.floor(ny / 2) + 1 + d;
		} else {
			number = Math.floor((ny+1)/2) + 1 + d;
		}
		res = letter + number;
		if (letter != "Z" && number != 0 && res != "A5" && res != "B6" && res != "C7" && res != "D7" && res != "E7" && res != "F6" && res != "G5" && res != "D1") {
			//valid coordinates
			setLandCoord(res);
		}
	}
});

document.getElementById("main").onload = function() {
	canvas.dispatchEvent(elementChanged);
};

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
		ctx.drawImage(this, start + (reswidth-dx)*index, hand.y - 50, reswidth, this.height*reswidth/this.width);
	});
};
elements.push(hand);

//Your Nickname
var nickname1 = new TextElement("bold 18px Libre Baskerville", 85, 1017, 142, 30);
nickname1.color = 'white';
nickname1.strokeColor = 'black';
nickname1.tab = '#myTab a[href="#general"]';
nickname1.textfield = '#form_name';
nickname1.text = ($('#form_name').val());
textelements.push(nickname1);
//on input redraw text
$('#form_name').on('input', function (event) {
	nickname1.setText($('#form_name').val());
});

//Opponent's Nickname
var nickname2 = new TextElement("bold 18px Libre Baskerville", 76, 34, 142, 30);
nickname2.color = 'white';
nickname2.strokeColor = 'black';
nickname2.tab = '#myTab a[href="#general"]';
nickname2.textfield = '#form_name2';
nickname2.text = ($('#form_name2').val());
textelements.push(nickname2);
//on input redraw text
$('#form_name2').on('input', function (event) {
	nickname2.setText($('#form_name2').val());
});

//Your Faeria
var faeria1 = new TextElement("bold 46px Libre Baskerville", 110, 891, 95, 95);
faeria1.color = "black";
faeria1.strokeColor = 'white';
faeria1.tab = '#myTab a[href="#general"]';
faeria1.textfield = '#form_faeria';
faeria1.text = ($('#form_faeria').val());
textelements.push(faeria1);
//on input redraw text
$('#form_faeria').on('input', function (event) {
	faeria1.setText($('#form_faeria').val());
});

//Opponent's Faeria
var faeria2 = new TextElement("bold 46px Libre Baskerville", 103, 95, 95, 95);
faeria2.color = "black";
faeria2.strokeColor = 'white';
faeria2.tab = '#myTab a[href="#general"]';
faeria2.textfield = '#form_faeria2';
faeria2.text = ($('#form_faeria2').val());
textelements.push(faeria2);
//on input redraw text
$('#form_faeria2').on('input', function (event) {
	faeria2.setText($('#form_faeria2').val());
});

var decksize1 = new TextElement("bold 16px Libre Baskerville", 133, 1054, 25, 25);
decksize1.color = "white";
decksize1.strokeColor = 'black';
decksize1.tab = '#myTab a[href="#general"]';
decksize1.textfield = '#form_decksize';
decksize1.text = ($('#form_decksize').val());
textelements.push(decksize1);
//on input redraw text
$('#form_decksize').on('input', function (event) {
	decksize1.setText($('#form_decksize').val());
});

var decksize2 = new TextElement("bold 16px Libre Baskerville", 126, 5, 25, 25);
decksize2.color = "white";
decksize2.strokeColor = 'black';
decksize2.tab = '#myTab a[href="#general"]';
decksize2.textfield = '#form_decksize2';
decksize2.text = ($('#form_decksize2').val());
textelements.push(decksize2);
//on input redraw text
$('#form_decksize2').on('input', function (event) {
	decksize2.setText($('#form_decksize2').val());
});

var handsize1 = new TextElement("bold 16px Libre Baskerville", 191, 1054, 20, 25);
handsize1.color = "white";
handsize1.strokeColor = 'black';
handsize1.onclick = function() {};
handsize1.text = '0';
textelements.push(handsize1);

var life1 = new TextElement("bold 34px Libre Baskerville" , 993, 748, 58, 46);
life1.color = "white";
life1.strokeColor = "black";
life1.tab = '#myTab a[href="#general"]';
life1.textfield = '#form_life';
life1.text = ($('#form_life').val());
textelements.push(life1);
$('#form_life').on('input', function (event) {
	life1.setText($('#form_life').val());
});

var life2 = new TextElement("bold 34px Libre Baskerville" , 993, 70, 58, 46);
life2.color = "white";
life2.strokeColor = "black";
life2.tab = '#myTab a[href="#general"]';
life2.textfield = '#form_life2';
life2.text = ($('#form_life2').val());
textelements.push(life2);
$('#form_life2').on('input', function (event) {
	life2.setText($('#form_life2').val());
});

var land_forest = new LandCounterElement("bold 20px Libre Baskerville", 'forest', 1, 69, 872, 48, 55);
land_forest.color = "#80FF76";
land_forest.img = document.getElementById("land_counter_forest");
elements.push(land_forest);

var land_forest_enemy = new LandCounterElement("bold 20px Libre Baskerville", 'forest', 2, 61, 137, 48, 55);
land_forest_enemy.color = "#80FF76";
land_forest_enemy.img = document.getElementById("land_counter_forest");
elements.push(land_forest_enemy);

var land_lake = new LandCounterElement("bold 20px Libre Baskerville", 'lake', 1, 109, 836, 48, 55);
land_lake.color = "#54F7FF";
land_lake.img = document.getElementById("land_counter_lake");
elements.push(land_lake);

var land_lake_enemy = new LandCounterElement("bold 20px Libre Baskerville", 'lake', 2, 101, 172, 48, 55);
land_lake_enemy.color = "#54F7FF";
land_lake_enemy.img = document.getElementById("land_counter_lake");
elements.push(land_lake_enemy);

var land_mountain = new LandCounterElement("bold 20px Libre Baskerville", 'mountain', 1, 159, 842, 48, 49);
land_mountain.color = "#FF613D";
land_mountain.img = document.getElementById("land_counter_mountain");
elements.push(land_mountain);

var land_mountain_enemy = new LandCounterElement("bold 20px Libre Baskerville", 'mountain', 2, 151, 179, 48, 49);
land_mountain_enemy.color = "#FF613D";
land_mountain_enemy.img = document.getElementById("land_counter_mountain");
elements.push(land_mountain_enemy);

var land_desert = new LandCounterElement("bold 20px Libre Baskerville", 'desert', 1, 198, 880, 48, 47);
land_desert.color = "#FFDE72";
land_desert.img = document.getElementById("land_counter_desert");
elements.push(land_desert);

var land_desert_enemy = new LandCounterElement("bold 20px Libre Baskerville", 'desert', 2, 190, 146, 48, 47);
land_desert_enemy.color = "#FFDE72";
land_desert_enemy.img = document.getElementById("land_counter_desert");
elements.push(land_desert_enemy);
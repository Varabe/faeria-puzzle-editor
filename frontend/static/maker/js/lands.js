
var landCoord = "D6";

function Unit() {
	this.type = "none"; //creature or structure
	this.side = 1;
	this.life = 0;
	this.power = 0;
	this.isjump = false;
	this.istaunt = false;
	this.ischarge = false;
	this.isflying = false;
	this.islegendary = false;
	this.setType = function (type) {
		this.type = type;
		canvas.dispatchEvent(elementChanged);
	};
	this.setSide = function (side) {
		this.side = side;
		canvas.dispatchEvent(elementChanged);
	};
	this.setLife = function(value) {
		this.life = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setPower = function(value) {
		this.power = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setJump = function(value) {
		this.isjump = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setTaunt = function(value) {
		this.istaunt = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setCharge= function(value) {
		this.ischarge = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setFlying= function(value) {
		this.isflying = value;
		canvas.dispatchEvent(elementChanged);
	};
	this.setLegendary= function(value) {
		this.islegendary = value;
		canvas.dispatchEvent(elementChanged);
	};
}
function Land() {
	this.type = 'ocean';
	this.side = 1;
	this.unit = new Unit();
	this.setType = function (type) {
		this.type = type;
		canvas.dispatchEvent(elementChanged);
	};
	this.setSide = function (side) {
		this.side = side;
		canvas.dispatchEvent(elementChanged);
	};
}

var LandList = ['A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'F1', 'F2', 'F3', 'F4', 'F5', 'G2', 'G3'];

var LandArray = {
	A2: new Land(), A3: new Land(),
	B1: new Land(), B2: new Land(), B3: new Land(), B4: new Land(), B5: new Land(),
	C1: new Land(), C2: new Land(), C3: new Land(), C4: new Land(), C5: new Land(), C6: new Land(),
	D2: new Land(), D3: new Land(), D4: new Land(), D5: new Land(), D6: new Land(),
	E1: new Land(), E2: new Land(), E3: new Land(), E4: new Land(), E5: new Land(), E6: new Land(),
	F1: new Land(), F2: new Land(), F3: new Land(), F4: new Land(), F5: new Land(),
	G2: new Land(), G3: new Land()
};

LandConst = {
	x0: 546, y0: 272,
	dx1: 81, dx2: 39, dx: 81 + 39,
	dy1: 49, dy: 98
};

$('html').keydown(function (event) {
	switch(event.which){
		case 81: //Q
			createLand('forest'); break;
		case 87: //W
			createLand('lake'); break;
		case 69: //E
			createLand('mountain'); break;
		case 82: //R
			createLand('desert'); break;
		case 65: //A
			switchSide(); break;
		case 83: //S
			createLand('prairie'); break;
		case 68: //D
			createLand('ocean'); break;
	}
});

function setLandCoord( lc ) {
	landCoord = lc;
	var xy = getLandXY(lc);
	$('.land_coordinates span').text(landCoord + " x: " + xy.x + " y: " + xy.y);
	setLandPills(LandArray[lc].type);
	setSwitch(LandArray[lc].side);
}

function getLandXY( lc ) {
	var d, n, x, y, letter = lc[0], number = lc[1];
	switch(letter) {
		case "A": n = 0; d = 0; break;
		case "B": n = 1; d = 1; break;
		case "C": n = 2; d = 2; break;
		case "D": n = 3; d = 3; break;
		case "E": n = 4; d = 2; break;
		case "F": n = 5; d = 1; break;
		case "G": n = 6; d = 0; break;
		default: break;
	}
	x = LandConst.x0 + n*LandConst.dx;
	y = LandConst.y0 + (number - 1)*LandConst.dy - d*LandConst.dy1;
	return {x: x, y: y};
}

function setLandPills(landtype) {
	$('#lands .mypills li[class=active]').removeClass('active');
	$('#lands .mypills a[type=' + landtype + '').parent().addClass('active');
}

function setSwitch(sd) {
	var img = $('#lands .mypills a[type=switch] img'),
		parent = img.parent();
	img.remove();
	parent.append($('#switch' + sd).clone());
	
}
function createLand(landtype) {
	setLandPills(landtype);
	LandArray[landCoord].setType(landtype);
}

function switchSide() {
	if (LandArray[landCoord].side == 1) {
		LandArray[landCoord].setSide(2);
		setSwitch(2);
	} else {
		LandArray[landCoord].setSide(1);
		setSwitch(1);
	}
}
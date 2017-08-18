
var side = 1;

$('html').keydown(function (event) {
	//q 81
	//w 87
	//e 69
	//r 82
	//a 65
	//s 83
	//d 68
	switch(event.which){
		case 81:
			createLand('forest'); break;
		case 87:
			createLand('lake'); break;
		case 69:
			createLand('mountain'); break;
		case 82:
			createLand('desert'); break;
		case 65:
			switchSide(); break;
		case 83:
			createLand('prairie'); break;
		case 68:
			createLand('ocean'); break;
	}
});

function createLand(landtype) {
	$('#lands .mypills li[class=active]').removeClass('active');
	$('#lands .mypills a[type=' + landtype + '').parent().addClass('active');
}

function switchSide() {
	var img = $('#lands .mypills a[type=switch] img'),
		parent = img.parent(),
		src = img.prop('src'),
		len = src.length;
	if (src[len - 5] == '1') { //ends with switch1.png
		img.remove();
		parent.append($('#switch2').clone());
		side = 2;
	} else {
		img.remove();
		parent.append($('#switch1').clone());
		side = 1;
	}
}
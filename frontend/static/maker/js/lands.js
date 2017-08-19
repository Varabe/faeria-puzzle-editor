
var side = 1;

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
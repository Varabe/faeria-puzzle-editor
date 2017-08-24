
var filter_land = -1, filter_creatures = false;
function setLandFilter( fil ) {
	switch(fil){
		case 'all':
			filter_land = -1;
			break;
		case 'neutral':
			filter_land = -2;
			break;
		case 'forest':
			filter_land = 0;
			break;
		case 'lake':
			filter_land = 1;
			break;
		case 'mountain':
			filter_land = 2;
			break;
		case 'desert':
			filter_land = 3;
			break;
		default:
			break;
	}
	$('#land_filter').find('li').removeClass('active');
	$('#land_filter #' + fil).addClass('active');
	cardFilter();
}

function nofilter() {
	filter_creatures = false;
	cardFilter();
}
function filterCreatures() {
	filter_creatures = true;
	cardFilter();
}

function addCard(card) {
	if (filter_creatures == false) {
		addToHand(card);
	} else {
		
	}
	$('.modal-footer button').click();
}

function cardFilter() {
    var input, filter, div, ul, li, a, i, lands, flag, type, flag2;
    input = document.getElementById('card_search');
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("card_list")[0];
	ul = div.getElementsByTagName('ul')[0];
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
		
		lands = a.getAttribute("lands"); //lands is an array string of land reqs: 'flmd'
		type = a.getAttribute("card_type"); //creture, event or structure
		if (filter_land != -2) {
			flag = ((filter_land == -1 || parseInt(lands[filter_land]) > 0) ? true : false);
		} else {
			//if filter is 'neutral' all lands must equal zero
			flag = true;
			for (var j = 0; j < lands.length; j++){
				if (parseInt(lands[j]) > 0) {
					flag = false;
					break;
				}
			}
		}
		if (filter_creatures) {
			flag2 = (type != "event");
		} else {
			flag2 = true;
		}
		
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1 && flag && flag2) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

$('#cardModal').on('shown.bs.modal', function() {
	$('#card_search').focus();
});

var filter_land = "all";
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

function cardFilter() {
    var input, filter, div, ul, li, a, i, lands, flag;
    input = document.getElementById('card_search');
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("card_list")[0];
	ul = div.getElementsByTagName('ul')[0];
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
		
		lands = a.getAttribute("lands"); //lands is an array string of land reqs: 'flmd'
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
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1 && flag) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function cardFilter() {
    var input, filter, div, ul, li, a, i;
    input = document.getElementById('card_search');
    filter = input.value.toUpperCase();
    div = document.getElementsByClassName("card_list")[0];
	ul = div.getElementsByTagName('ul')[0];
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
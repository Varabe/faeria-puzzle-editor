from scripts.lib.database import Database
from django.http import HttpResponse
from django.template import loader
import scripts.lib.cards as cardlib


def index(request):
	database = Database("data/cards/merlin_shortened.csv")
	all_cards = database.getAll()
	context = {"all_cards":all_cards}
	template = loader.get_template("maker/index.html")
	render = template.render(context, request)
	return HttpResponse(render)

def cards(request, card_id):
	card_id = cardlib.formatId(card_id)
	#TODO: checkpath (not possible through os, probably will have to do through templates)
	path = f"/static/cards/English/{card_id}.png"
	response = f"<img src={path}>"
	return HttpResponse(response)
		
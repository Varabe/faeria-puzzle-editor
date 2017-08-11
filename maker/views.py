from scripts.lib.database import Database
from django.http import HttpResponse
from django.template import loader
import scripts.lib.cards as cardlib
import os


def index(request):
	database = Database("cardbase.csv")
	all_cards = database.getAll()
	context = {"all_cards":all_cards}
	template = loader.get_template("maker/index.html")
	render = template.render(context, request)
	return HttpResponse(render)

def cards(request, card_id):
	image = "%s.png" % cardlib.formatId(card_id)
	django_path = "/static/cards/English/" + image
	real_path = "frontend" + django_path
	if os.path.exists(real_path):
		response = "<img src=%s>" % django_path
	else:
		response = "Card not found."
	return HttpResponse(response)
		
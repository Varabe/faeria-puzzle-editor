from scripts.lib.database import Database
from django.http import HttpResponse
from django.template import loader
import scripts.lib.cards as cardlib
import os


def index(request):
	database = Database("cardbase.csv")
	all_cards = database.getAll()
	info = yieldCardsInfo(all_cards)
	context = {"cards":info}
	template = loader.get_template("maker/index.html")
	render = template.render(context, request)
	return HttpResponse(render)


def yieldCardsInfo(cards):
	land_cost = ", lands:"
	names = ("L", "M", "F", "D")
	for card in cards:
		cost = card.faeria
		values = card.lake, card.mountain, card.forest, card.desert
		lands = [(n, v) for n, v in zip(names, values) if v is not '']
		if lands:
			cost += land_cost
			for name, value in lands:
				cost += " %s%s" % (name, value)
		yield card.id, card.name, cost 


def cards(request, card_id):
	image = "%s.png" % cardlib.formatId(card_id)
	django_path = "/static/cards/English/" + image
	real_path = "frontend" + django_path
	if os.path.exists(real_path):
		response = "<img src=%s>" % django_path
	else:
		response = "Card not found."
	return HttpResponse(response)
		
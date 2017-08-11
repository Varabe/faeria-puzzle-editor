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
	# Пока что функция уродлива, потом рефакторну
	land_names = ["L", "M", "F", "D"]
	for card in cards:
		land_values = card.lake, card.mountain, card.forest, card.desert
		lands = tuple(zip(land_names, land_values))
		lands = [(n, v) for n, v in lands if v is not '']
		cost = "lands:"
		for name, value in lands:
			cost += " %s%s" % (name, value)
		if cost == "lands:":
			cost = card.faeria
		else:
			cost = "%s, %s" % (card.faeria, cost)
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
		
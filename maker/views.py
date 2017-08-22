from maker.scripts.cards.cardbase import Cardbase
from django.shortcuts import render


def index(request):
	cardbase = Cardbase("cardbase.csv")
	all_cards = cardbase.getAll()
	context = {"cards":all_cards}
	return render(request, "maker/index.html", context)

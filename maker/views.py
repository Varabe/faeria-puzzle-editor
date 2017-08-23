from maker.scripts.cards.cardbase import Cardbase
from django.shortcuts import render

cardbase = Cardbase("cardbase.csv")


def index(request):
	cards = cardbase.getAll()
	return render(request, "maker/index.html", context={"cards":cards})

from maker.scripts.cards.cardbase import Cardbase, CardbaseError
from django.shortcuts import render
from django.http import JsonResponse

cardbase = Cardbase("cardbase.csv")


def index(request):
	cards = cardbase.get_all()
	return render(request, "maker/index.html", context={"cards":cards})


def get_card(request, card_id):
	try:
		card = cardbase.get_by_id(card_id)
	except CardbaseError:
		return JsonResponse({"error":"Card not found"}, status=404)
	return JsonResponse(card)

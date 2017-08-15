from scripts.cardbase import Cardbase
from django.http import HttpResponse
from django.template import loader


def index(request):
	cardbase = Cardbase("cardbase.csv")
	all_cards = cardbase.getAll()
	context = {"cards":all_cards}
	template = loader.get_template("maker/index.html")
	render = template.render(context, request)
	return HttpResponse(render)
from django.shortcuts import render


def index(request):
	return render(request, "faeria_puzzle/index.html")

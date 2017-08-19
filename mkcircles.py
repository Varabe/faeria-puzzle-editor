import os
from CLI import crop
from maker.scripts import cardimages, github

def main():
	github._makedirs("CIRCLES")
	cards = crop.yieldCardsOfLanguage("English")
	for card in cards:
		file_name = os.path.basename(card)
		cardimages.editImage(card, "CIRCLES/" + file_name, mode="circle")


if __name__ == "__main__":
	main()

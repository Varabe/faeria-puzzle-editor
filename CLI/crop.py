import os

from CLI.update import LANGUAGES
from maker.scripts import cardimages
from faeria_puzzle.settings import CARD_FOLDER


def main():
	card_folder = os.listdir(CARD_FOLDER)
	for name in card_folder:
		if name in LANGUAGES:
			cropCardsOfLanguage(name)


def cropCardsOfLanguage(language):
	folder_name = CARD_FOLDER + language + "/"
	files = getImages(folder_name)
	for file_name in files:
		path = folder_name + file_name
		cardimages.resize(path, do_thumbnail=True)


def getImages(folder_name):
	files = os.listdir(folder_name)
	files = [file for file in files if file.endswith(".png")]
	files.sort(key=lambda n:int(n[:n.index(".")])) # by id
	return files

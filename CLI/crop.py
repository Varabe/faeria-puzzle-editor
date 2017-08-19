import os

from CLI.update import LANGUAGES
from maker.scripts import cardimages
from faeria_puzzle.settings import CARD_FOLDER


CROP_MODES = ["thumbnail", "circle"]


def main():
	card_folder = os.listdir(CARD_FOLDER)
	for name in card_folder:
		if name in LANGUAGES:
			for card in yieldCardsOfLanguage(name):
				cardimages.editImage(card)


def yieldCardsOfLanguage(language):
	folder_name = CARD_FOLDER + language + "/"
	files = getImages(folder_name)
	for file_name in files:
		file_path = folder_name + file_name
		yield file_path


def getImages(folder_name):
	files = os.listdir(folder_name)
	files = [file for file in files if file.endswith(".png")]
	files.sort(key=lambda n:int(n[:n.index(".")])) # by id
	return files

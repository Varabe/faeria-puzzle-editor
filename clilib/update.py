from faeria_puzzle.settings import CARD_DIR
from faeria_puzzle.settings import CARD_LANGUAGES
from maker.scripts import github
from maker.scripts import utils

LANGUAGE_CHOICES = CARD_LANGUAGES + ["ALL"]


def main(download_cards, languages):
	if "ALL" in languages:
		languages = CARD_LANGUAGES
	downloadDatabase()
	if download_cards is True:
		downloadCards(languages)


def downloadDatabase():
	url = "https://raw.githubusercontent.com/abrakam/Faeria_Cards/master/CardExport/merlin_shortened.csv"
	path = "cardbase.csv"
	utils.downloadFile(url, path)
	print("Updated database")


def downloadCards(languages):
	owner = "abrakam"
	repo = "Faeria_Cards"
	folder_path = "CardExport"
	for language in languages:
		folder_name = language
		github.downloadFolder(owner, repo, folder_path, folder_name, path=CARD_DIR)
		print("Folder '%s' finished downloading" % language)

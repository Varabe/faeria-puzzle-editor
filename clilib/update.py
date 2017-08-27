from faeria_puzzle.settings import CARD_DIR
from maker.scripts import github
from maker.scripts import utils


def main(need_cards, languages):
	download_database()
	if need_cards is True:
		download_cards(languages)


def download_database():
	url = "https://raw.githubusercontent.com/abrakam/Faeria_Cards/master/CardExport/merlin_shortened.csv"
	path = "cardbase.csv"
	utils.download_file(url, path)
	print("Updated database")


def download_cards(languages):
	owner = "abrakam"
	repo = "Faeria_Cards"
	folder_path = "CardExport"
	for language in languages:
		folder_name = language
		github.download_folder(owner, repo, folder_path, folder_name, path=CARD_DIR)
		print("Folder '{}' finished downloading".format(language))

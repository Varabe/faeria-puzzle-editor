from faeria_puzzle.settings import CARD_FOLDER
from maker.scripts import github

LANGUAGES = [
	"ChineseSimplified", "ChineseTraditional", "Czech",
	"English", "French", "German", "Italian", "Japanese",
	"Korean", "Portuguese", "Russian", "Spanish"]
LANGUAGE_CHOICES = LANGUAGES + ["ALL"]


def main(download_cards, languages):
	downloadDatabase()
	if "ALL" in languages:
		languages = LANGUAGES
	if download_cards is True:
		downloadCards(languages)


def downloadDatabase():
	url = "https://raw.githubusercontent.com/abrakam/Faeria_Cards/master/CardExport/merlin_shortened.csv"
	path = "cardbase.csv"
	github.downloadFile(url, path)
	print("Updated database")


def downloadCards(languages):
	owner = "abrakam"
	repo = "Faeria_Cards"
	folder_path = "CardExport"
	for language in languages:
		folder_name = language
		github.downloadFolder(owner, repo, folder_path, folder_name, path=CARD_FOLDER)
		print("Folder '%s' finished downloading" % language)

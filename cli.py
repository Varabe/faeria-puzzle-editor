import os

from argparse import ArgumentParser
from maker.scripts import cardimages
from maker.scripts.github import downloadFile
from maker.scripts.github import downloadFolder


LANGUAGES = [
	"ChineseSimplified", "ChineseTraditional", "Czech",
	"English", "French", "German", "Italian", "Japanese",
	"Korean", "Portuguese", "Russian", "Spanish"]
LANGUAGE_CHOICES = LANGUAGES + ["ALL"]
CARD_FOLDER = "frontend/static/cards/"


def main(args=None):
	""" To use inside a script:

		main(["update", "-c", "-l", "English", "Russian"])
		>>> Updates database and downloads English and Russian cards
		(must be imported from the same directory)
	"""
	parser = makeParser()
	args = [args] if args else []
	args = parser.parse_args(*args)
	if args.command == "update":
		update(args)
	elif args.command == "crop":
		crop(args)


def update(args):
	downloadDatabase()
	if args.cards:
		downloadCards(args.languages)


def crop(args):
	card_folder = os.listdir(CARD_FOLDER)
	for name in card_folder:
		if name in LANGUAGES:
			cropCardsOfLanguage(name)


def cropCardsOfLanguage(language):
	folder_name = CARD_FOLDER + language + "/"
	folder = os.listdir(folder_name)
	folder = [file for file in folder if file.endswith(".png")]
	folder.sort(key=lambda n:int(n[:n.index(".")])) # by id
	for file_name in folder:
		path = folder_name + file_name
		try:
			cardimages.resize(path, do_thumbnail=True)
		except OSError:
			raise OSError(path + " is damaged. Please, download it again")


def makeParser():
	parser = ArgumentParser(prog="Card manager")
	subparser_creator = parser.add_subparsers(dest="command")
	makeUpdateParser(subparser_creator)
	makeCropParser(subparser_creator)
	return parser


def makeUpdateParser(subparser_creator):
	parser = subparser_creator.add_parser("update")
	parser.add_argument("-c", "--cards",
		action="store_true", help="Download card folder(s) (may take a lot of time)")
	parser.add_argument("-l", "--language",
		dest="languages", nargs="+", default=["English"], choices=LANGUAGE_CHOICES,
		metavar="", help="Download language folder(s), default = 'English'")


def makeCropParser(subparser_creator):
	subparser_creator.add_parser("crop", help="Crop card images")


def downloadDatabase():
	url = "https://raw.githubusercontent.com/abrakam/Faeria_Cards/master/CardExport/merlin_shortened.csv"
	path = "cardbase.csv"
	downloadFile(url, path)
	print("Updated database")


def downloadCards(languages):
	if "ALL" in languages:
		languages = LANGUAGES
	for language in languages:
		downloadCardFolder(language)


def downloadCardFolder(language):
	owner = "abrakam"
	repo = "Faeria_Cards"
	folder_path = "CardExport"
	folder_name = language
	path = "frontend/static/cards/"
	downloadFolder(owner, repo, folder_path, folder_name, path)
	print("Folder '%s' finished downloading" % language)


if __name__ == "__main__":
	main()

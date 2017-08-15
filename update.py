from argparse import ArgumentParser

from maker.scripts.github import downloadFile, downloadFolder


LANGUAGES = [
	"ChineseSimplified", "ChineseTraditional", "Czech",
	"English", "French", "German", "Italian", "Japanese", 
	"Korean", "Portuguese", "Russian", "Spanish"]


def main(args=None):
	""" To use inside a script:

		main(["-c", "-l", "English", "Russian"])
		>>> Updates database and downloads English and Russian cards
		(must be imported from the same directory)
	"""
	parser = makeParser()
	args = [args] if args else []
	args = parser.parse_args(*args)
	downloadDatabase()
	if args.cards:
		downloadCards(args.languages)


def makeParser():
	parser = ArgumentParser(prog="CardBase updater")
	parser.add_argument("-c", "--cards",
		action="store_true", help="Download card folder(s) (may take a lot of time)")
	languages = LANGUAGES + ["ALL"]
	parser.add_argument("-l", "--language",
		dest="languages", nargs="+", default=["English"],
		choices=languages, metavar="", help="Default: 'English', Choices:" + str(languages))
	return parser


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
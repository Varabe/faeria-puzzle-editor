from CLI import crop
from CLI import update
from argparse import ArgumentParser


def main(args=None):
	""" To use inside a script:

		main(["update", "-c", "-l", "English", "Russian"])
		>>> Updates database and downloads English and Russian cards
		main(["crop"])
		>>> Crops cards by edges and makes them smaller for performance
	"""
	parser = makeParser()
	args = [args] if args else []
	args = parser.parse_args(*args)
	if args.command == "update":
		update.main(args.cards, args.languages)
	elif args.command == "crop":
		crop.main()


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
		dest="languages", nargs="+", default=["English"], choices=update.LANGUAGE_CHOICES,
		metavar="", help="Download language folder(s), default = 'English'")


def makeCropParser(subparser_creator):
	subparser_creator.add_parser("crop", help="Crop card images")


if __name__ == "__main__":
	main()

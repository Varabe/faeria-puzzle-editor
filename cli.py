from argparse import ArgumentParser

from clilib import auto
from clilib import crop
from clilib import update
from faeria_puzzle.settings import CARD_LANGUAGES

LANGUAGE_CLI_ARGS = ("-l", "--language")
LANGUAGE_CLI_KWARGS = {
	"dest":"languages",
	"nargs":"+",
	"metavar":"",
	"default":["English"],
	"choices":CARD_LANGUAGES + ["ALL"],
	"help":"Take action on specific language folders, default = 'English', use 'ALL' to select all folders"
}


def main(args=None):
	""" To use inside a script:

		main(["update", "-c", "-l", "English", "Russian"])
		>>> Updates database and downloads English and Russian cards
		main(["crop", "-m", "thumbnail", "-l", "English"])
		>>> Crops cards by edges and makes them smaller for performance
	"""
	parser = make_main_parser()
	args = [args] if args else []
	args = parser.parse_args(*args)
	if args.command is not None:
		if "ALL" in args.languages:
			args.languages = CARD_LANGUAGES
		execute_command(args)


def execute_command(args):
	if args.command == "update":
		update.main(args.cards, args.languages)
	elif args.command == "crop":
		crop.main(args.languages, args.mode)
	elif args.command == "auto":
		auto.main(args.languages)


def make_main_parser():
	parser = ArgumentParser(prog="Card manager")
	subparser_creator = parser.add_subparsers(dest="command")
	subparser_creator.required = True # subparsers are required
	make_update_parser(subparser_creator)
	make_crop_parser(subparser_creator)
	make_auto_parser(subparser_creator)
	return parser


def make_update_parser(subparser_creator):
	parser = subparser_creator.add_parser("update",
		help="Download cardbase and card folders")
	parser.add_argument("-c", "--cards",
		action="store_true", help="Download card folder(s) (may take a lot of time)")
	parser.add_argument(*LANGUAGE_CLI_ARGS, **LANGUAGE_CLI_KWARGS)


def make_crop_parser(subparser_creator):
	parser = subparser_creator.add_parser("crop",
		help="Crop card images")
	parser.add_argument("-m", "--mode",
		choices=crop.CROP_MODES, help="Choose a cropping mode", default="thumbnail")
	parser.add_argument(*LANGUAGE_CLI_ARGS, **LANGUAGE_CLI_KWARGS)


def make_auto_parser(subparser_creator):
	parser = subparser_creator.add_parser("auto",
		help="Enters all the needed commands to update/crop cards for you (may take time!)")
	parser.add_argument(*LANGUAGE_CLI_ARGS, **LANGUAGE_CLI_KWARGS)


if __name__ == "__main__":
	main()

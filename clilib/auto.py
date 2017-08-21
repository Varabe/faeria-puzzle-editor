def main(languages):
	import cli # due to recursive import
	cli.main(["update", "-c", "-l"] + languages)
	cli.main(["crop", "-m", "circle", "-l"] + languages)
	cli.main(["crop", "-m", "thumbnail", "-l"] + languages)

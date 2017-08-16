from maker.scripts.cards import formatId, Card


def test_formatId(self):
	assert formatId("1") == "001"
	assert formatId("10") == "010"
	assert formatId("100") == "100"
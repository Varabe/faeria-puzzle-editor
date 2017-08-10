from django.conf.urls import url

from maker.views import index, cards


urlpatterns = [
	url(r'^$', index, name="index"),
	url(r'^cards/(?P<card_id>\d{1,3})$', cards),
]
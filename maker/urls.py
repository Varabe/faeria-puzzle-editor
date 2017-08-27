from django.conf.urls import url

from maker.views import index, get_card


urlpatterns = [
	url(r'^$', index, name="index"),
	url(r'^card/(?P<card_id>\d{1,3})/$', get_card, name="card"),
]

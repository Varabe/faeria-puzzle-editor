from django.conf.urls import url

from maker.views import index


urlpatterns = [
	url(r'^$', index, name="index"),
]

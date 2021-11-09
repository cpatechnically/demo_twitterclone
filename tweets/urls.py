from django.urls import path

from .views import (
    home_view,
    local_tweets_list_view,
    local_tweets_detail_view,
)

app_name="tweets"
urlpatterns = [
    path('',home_view,name="home"),
    path('local/list/', local_tweets_list_view),
    path('local/<int:tweet_id>/', local_tweets_detail_view),
]
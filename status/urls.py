from django.urls import path

from .views import (
    home
)

app_name="status"
urlpatterns = [
    path('',home,name='home'),
]
import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

# Create your views here.
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    template_name = "apps/update/home.html"
    pgname = "Update App"
    context = {
        "pgname":pgname
    }
    #status = 200
    return render(request,template_name,context)
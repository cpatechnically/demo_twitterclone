import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    template_name = "apps/tweets/purejs_home.html"
    context = {
        "username":username
    }
    #status = 200
    return render(request,template_name,context,status=200)

def local_tweets_list_view(request,*args, **kwargs):
    template_name = "apps/tweets/list.html"
    context = {
    }
    #status = 200
    return render(request,template_name,context)

def local_tweets_detail_view(request,tweet_id, *args, **kwargs):
    template_name = "apps/tweets/detail.html"
    context = {
        "tweet_id":tweet_id
    }
    return render(request,template_name,context)

def local_tweets_profile_view(request,username, *args, **kwargs):
    template_name = "apps/tweets/profile.html"
    context = {
        "profile_username":username
    }
    return render(request,template_name,context)
    #return render(request, "pages/feed.html")


def js_tweet_create_view(request, *args, **kwargs):
    #print("ajax", request.is_ajax())
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({},status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    #print("next_url", next_url)
    print(request.POST,user)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user #request.user or None
        obj.save()
        if request.is_ajax():
            return JsonResponse({}, status=201) # 201 == created item
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

    return render(request, "components/form.html",context={"form":form})


def js_tweets_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Andriod
    return json data
    """
    qs = Tweet.objects.all()
    tweets_list = [{"id":x.id,"content":x.content} for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def js_tweets_detail_view(request, tweet_id, *args, **kwargs):
    context = {"tweet_id": tweet_id}
    return render(request, "apps/tweets/detail.html", context)




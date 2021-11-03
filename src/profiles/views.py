import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from .models import (Profile)
from .forms import (
    ProfileForm
)

# Create your views here.
def profile_detail_view(request,username, *args, **kwargs):
    template_name = "profiles/detail.html"
    #get profile for the passed in username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        "username":username,
        "profile":profile_obj
    }
    #status = 200
    return render(request,template_name,context)


def profile_update_view(request, *args, **kwargs):
    template_name = "profiles/form.html"
    #get profile for the passed in username
    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update")
    form = ProfileForm()
    user = request.user
    my_profile = user.profile
    form == ProfileForm(request.POST or None, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        fn = form.cleaned_data.get("first_name")
        ln = form.cleaned_data.get("last_name")
        email = form.cleaned_data.get("email")
        user.first_name = fn
        user.last_name = ln
        user.email = email
        user.save()
        profile_obj.save()
    context = {
        "form":form,
        "btn_label":"Save",
        "title":"Update Profile"
    }
    #status = 200
    return render(request,template_name,context)

from django.shortcuts import render,redirect


def index(request,*args,**kwargs):
    template_name="index/index.html"
    app_name="AppName"
    context={
        "app_name":app_name
    }
    
    return render(request,template_name,context)
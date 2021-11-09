from django.shortcuts import render


# Create your views here.
def home(request):
    template = 'home_page.html'
    return render(request,template)

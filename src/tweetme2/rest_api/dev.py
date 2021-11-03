from django.contrib.auth import get_user_model
from rest_framework import authentication


User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        print(f"\nCALLED authenticate {request}")
        qs = User.objects.filter(id=1)
        user = qs.order_by("?").first() #order by random
        print(f"\nuser {user}") 
        return (user, None) #returns random user
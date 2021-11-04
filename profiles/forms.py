from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from .models import Profile

User = settings.AUTH_USER_MODEL

class ProfileForm(forms.ModelForm):
    first_name  = forms.CharField(required=False)
    last_name   = forms.CharField(required=False)
    email       = forms.EmailField(required=False)
    class Meta:
        model = Profile
        fields = [
            'location',
            'bio',
        ]

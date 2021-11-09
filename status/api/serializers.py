from django.contrib.auth import get_user_model
from rest_framework import serializers
from accounts.api.serializers import UserPublicSerializer
from rest_framework.reverse import reverse as api_reverse

User = get_user_model()

from status.models import Status

'''
serializers -> turn into JSON
serializers -> validate the data
'''

#Customer serializer example
class CustomSerializer(serializers.Serializer):
    content     = serializers.CharField()
    email       = serializers.EmailField()


class StatusInlineUserSerializer(serializers.ModelSerializer):
    uri                     = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Status
        fields = [
            'uri',
            'id',
            'user',
            'content',
            'image',
        ]
        #read_only_fields = ['user'] #GET calls it will be read only REGARDLESS of what is done in the view

    def get_uri(self, obj):
        #request = self.context.get('request')
        return "/api/status/{id}/".format(id=obj.id) #api_reverse("api-user:detail", kwargs={"username": obj.username}, request=request)


class StatusSerializer(serializers.ModelSerializer):
    uri                     = serializers.SerializerMethodField(read_only=True)
    user                    = UserPublicSerializer(read_only=True)
    class Meta:
        model = Status
        fields = [
            'uri',
            'id',
            'user',
            'content',
            'image',
        ]
        #read_only_fields = ['user'] #GET calls it will be read only REGARDLESS of what is done in the view

    def get_uri(self, obj):
        #request = self.context.get('request')
        return "/api/status/{id}/".format(id=obj.id) #api_reverse("api-user:detail", kwargs={"username": obj.username}, request=request)

    def validate_content(self,value):
        if len(value) > 1000:
            raise serializers.ValidationError("This is way too long")
        return value
    
    def validate(self,data):
        content = data.get("content",None)
        if content == "":
            content = None
        image = data.get("image",None)
        if content is None and image is None:
            raise serializers.ValidationError("content or image is required.")
        return data
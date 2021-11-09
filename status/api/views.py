import json
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from accounts.api.permissions import IsOwnerOrReadOnly
from .serializers import StatusSerializer

from status.models import Status
from rest_framework import generics, mixins, permissions
from django.shortcuts import get_object_or_404


class StatusDetailAPIView(
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.RetrieveAPIView
):
    permission_classes                      = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class                        = StatusSerializer
    queryset                                = Status.objects.all()
    lookup_field                            = 'id'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



class StatusAPIView(
    mixins.CreateModelMixin,
    generics.ListAPIView
):
    permission_classes                      = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class                        = StatusSerializer
    passed_id                               = None

    def get_queryset(self):
        request = self.request
        print(request.user)
        qs = Status.objects.all()
        query = self.request.GET.get('q')
        # query params: ?q=...
        if query is not None:
            qs = qs.filter(content__icontains=query)
        return qs

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

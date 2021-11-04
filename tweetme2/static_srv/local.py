from django.conf import settings
import os

from cpat_tools.settings.local import BASE_DIR

MODULE = "static_srv"



STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "my_static")
]

STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR),"static_cdn","static_root")

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR),"static_cdn","media_root")

STATIC_DICT = {
    "dir":STATICFILES_DIRS,
    "static_root":STATIC_ROOT,
    "media_url":MEDIA_URL,
    "media_root":MEDIA_ROOT,
}
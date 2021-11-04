DEBUG=True
DEFAULT_RENDERER_CLASSES = [
        'rest_framework.renderers.JSONRenderer',
    ]

DEFAULT_AUTHENTICATION_CLASSES = [
    'rest_framework.authentication.SessionAuthentication'
]
if DEBUG:
    DEFAULT_RENDERER_CLASSES += [
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
    # DEFAULT_AUTHENTICATION_CLASSES += [
    #     'tweetme2.rest_api.dev.DevAuthentication' #THIS IS necessary for us to play around in dev
    # ]
REST_FRAMEWORK = {
    
    'DEFAULT_AUTHENTICATION_CLASSES': DEFAULT_AUTHENTICATION_CLASSES,
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES
}
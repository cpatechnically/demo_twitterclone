MODULE=""
from .base import *

#from .production import *

from .local import *
# try:
#    ###########from .local import * *
# except:
#     print(f"LOCAL ERRORS...")
#     pass
print(f"\nSETTINGS MODULE IS.. {MODULE} \nDATABASES['default'] -> {DATABASES['default']} \nALLOWED_HOSTS {ALLOWED_HOSTS} \nBASE_DIR {BASE_DIR} \nSTATICFILES_DIRS {STATICFILES_DIRS} \nDEBUG {DEBUG}")
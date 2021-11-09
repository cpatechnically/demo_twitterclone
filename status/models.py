from django.db import models
from django.conf import settings

def upload_status_image(instance, filename):
    return "status/{user}/{filename}".format(user=instance.user,filename=filename)


class StatusQuerySet(models.QuerySet):
    pass
    # def serialize(self):
    #     qs = self
    #     return serialize('json',qs,fields=('user','content','image'))

class StatusManager(models.Manager):
    def get_queryset(self):
        return StatusQuerySet(self.model,using=self._db)



# Create your models here.
class Status(models.Model):
    user    = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    content = models.TextField(null=True,blank=True)
    image   = models.ImageField(upload_to=upload_status_image,null=True,blank=True)
    update  = models.DateTimeField(auto_now=True)
    timestamp  = models.DateTimeField(auto_now_add=True)

    objects = StatusManager()

    def __str__(self):
        return str(self.content)[:50]

    @property
    def owner(self):
        return self.user

    class Meta:
        verbose_name = 'Status post'
        verbose_name_plural = 'Status posts'
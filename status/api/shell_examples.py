from django.utils.six import BytesIO
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from status.api.serializers import StatusSerializer, CustomSerializer
from status.models import Status

'''
Serialize a single object
'''
obj = Status.objects.first()
serializer = StatusSerializer(obj)
serializer.data
json_data = JSONRenderer().render(serializer.data)
print(json_data)

stream = BytestIO(json_data)
data = JSONParser().parse(stream)
print(data)


'''
Create obj
'''
data = {'user':1}
serializer = StatusSerializer(data=data)
serializer.is_valid()
serializer.save()

if serializer.is_valid():
    serializer.save()

'''
Update obj
'''
obj = Status.objects.first()
data = {'content':'some new content',"user":1}
update_serializer = StatusSerializer(obj,data=data)
update_serializer.is_valid()
update_serializer.save()


'''
Delete obj
'''
data = {'user':1,'content':'please delete me'}
create_obj_serializer = StatusSerializer(data=data)
create_obj_serializer.is_valid()
create_obj = create_obj_serializer.save() #instance of the object
print(create_obj)

#data = {'id':6}
obj = Status.objects.last()
get_data_serializer = StatusSerializer(obj)
# update_serializer.is_valid()
# update_serializer.save()
print(get_data_serializer.data)


'''
Custom Serializer
'''
data = {'email':'abc@ckcadvisors.com','content':'Please delete me'}
create_obj_serializer = CustomSerializer(data=data)
if create_obj_serializer.is_valid():
    data = create_obj_serializer.data
    print(data)
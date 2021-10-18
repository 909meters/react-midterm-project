from rest_framework import status, generics

from todo.models import Todo
from todo.serializers import TodoListSerializer
# Create your views here.


class TodoList(generics.ListCreateAPIView):
  queryset = Todo.objects.all()
  serializer_class = TodoListSerializer

class TodoListUpdate(generics.RetrieveUpdateDestroyAPIView):
  lookup_field = 'id'
  queryset = Todo.objects.all()
  serializer_class = TodoListSerializer
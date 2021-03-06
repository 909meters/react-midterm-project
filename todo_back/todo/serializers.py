from rest_framework import fields, serializers
from todo.models import Todo


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

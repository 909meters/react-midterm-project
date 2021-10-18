from django.urls import path
from todo.views import TodoList, TodoListUpdate

urlpatterns = [
    path('list/', TodoList.as_view()),
    path('list/<id>/', TodoListUpdate.as_view())
]

from django.db import models
from django.db.models import base


class Todo(models.Model):
    text = models.TextField()
    date = models.DateTimeField(auto_now=True)
    planned_date = models.DateTimeField(null=True, blank=True)
    done = models.BooleanField()
    image = models.ImageField(upload_to="todo", null=True, blank=True)

    def __str__(self):
        return self.text[:30]

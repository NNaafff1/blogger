from django.contrib import admin
from .models import Blog,Comment,Group,Reaction
# Register your models here.



admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Group)
admin.site.register(Reaction)


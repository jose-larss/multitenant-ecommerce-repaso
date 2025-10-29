from django.contrib import admin

from shop.models import Category


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at', 'updated_at']

admin.site.register(Category, CategoryAdmin)

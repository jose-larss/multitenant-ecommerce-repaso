from django.contrib import admin

from shop.models import Category, SubCategory


class SubcategoryInline(admin.TabularInline):
    model = SubCategory
    list_display = ['id', 'name', 'slug', 'created_at', 'updated_at']
    prepopulated_fields = {'slug': ('name',)}
    extra=1


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [SubcategoryInline]

admin.site.register(Category, CategoryAdmin)

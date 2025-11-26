from django.contrib import admin

from shop.models import Category, SubCategory, Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category", "subcategory", "slug", "price", "refundpolicy"]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]


class SubcategoryInline(admin.TabularInline):
    model = SubCategory
    list_display = ['id', 'name', 'slug', 'created_at', 'updated_at']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    extra=1


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    inlines = [SubcategoryInline]

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)

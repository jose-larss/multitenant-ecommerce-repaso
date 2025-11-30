from django.contrib import admin

from shop.models import Category, SubCategory, Product, Tag


class TagAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'created_at', 'updated_at']
    readonly_fields = ["created_at", "updated_at"]


class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "slug", "description", "category", "subcategory", "price", "refundpolicy"]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    filter_horizontal = ["tags"]
    list_filter = ["category", 'tags']
    list_editable = ["refundpolicy", "price"]


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
admin.site.register(Tag, TagAdmin)

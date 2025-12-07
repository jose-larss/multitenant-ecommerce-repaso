from django.contrib import admin

from users.admin import admin_site

from shop.models import Category, SubCategory, Product, Tag, Tenant


class TenantAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "stripeAccountId", "stripeDetailsSubmitted"]
    list_filter = ["stripeDetailsSubmitted"]
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ["name", "slug", "stripeAccountId"]
    readonly_fields = ["created_at", "updated_at","stripeAccountId", "stripeDetailsSubmitted"]

    fieldsets = (
        (None, {
            "fields": ("name", "slug", "imagen")
        }),
        ("Información Stripe", {
            "fields": ("stripeAccountId", "stripeDetailsSubmitted"),
            "description": "Estos campos son de solo lectura y provienen de la integracion con Stripe"
        })
    )


class TagAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'created_at', 'updated_at']
    readonly_fields = ["created_at", "updated_at"]


class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "slug", "description", "category", "subcategory", "tenant", "price", "refundpolicy"]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    list_editable = ["tenant"]
    #exclude = ("tenant",)
    filter_horizontal = ["tags"]
    list_filter = ["category", 'tags']
    list_editable = ["refundpolicy", "price"]
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # superuser ve todo
        if request.user.is_superuser:
            return qs
        
        # usuario staff (propietario de un tenant)
        if request.user.is_staff:
            return qs.filter(tenant=request.user.tenant)

        # usuarios normales: no pueden ver productos
        return qs.filter(user=request.user.tenant)

    def save_model(self, request, obj, form, change):
        # 🔹 Si el producto es nuevo o no tiene tenant, asigna el del usuario
     
        if not change or not obj.tenant:
            obj.tenant = request.user.tenant
        obj.save()


class SubcategoryInline(admin.TabularInline):
    model = SubCategory
    list_display = ['id', 'name', 'slug', 'created_at', 'updated_at']
    search_fields = ["name"]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    extra=1


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at']
    search_fields = ["name"]
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ["created_at", "updated_at"]
    inlines = [SubcategoryInline]

admin_site.register(Category, CategoryAdmin)
admin_site.register(Product, ProductAdmin)
admin_site.register(Tag, TagAdmin)
admin_site.register(Tenant, TenantAdmin)

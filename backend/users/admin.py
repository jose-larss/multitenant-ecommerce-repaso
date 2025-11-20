from django.contrib import admin

from users.models import CustomUser

from users.forms import CustomUserCreationFom, CustomUserChangeForm

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    form = CustomUserChangeForm
    add_form = CustomUserCreationFom

    list_display = ["username", "email", "is_staff", "is_superuser"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    ordering = ["email"]
    search_fields = ["email", "username"]

    fieldsets = [
        (None, {'fields': ["email", "username", "password"]}),
        ("Permisos", {'fields': ["is_staff", "is_superuser", "is_active", "groups", "user_permissions"]}),
        ("Fechas", {'fields': ["last_login", "date_joined"]})
    ]
    """
    add_fieldsets = [
        (None, {'classes': ["wide"], 'fields': {"email", "username", "email", "is_staff", "is_superuser"}})
    ]
    """


admin.site.register(CustomUser, CustomUserAdmin)

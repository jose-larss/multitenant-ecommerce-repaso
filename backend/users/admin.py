from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken
)


from users.models import CustomUser
from users.forms import CustomUserCreationFom, CustomUserChangeForm


class CustomAdminSite(admin.AdminSite):

    def logout(self, request, extra_context=None):
        return HttpResponseRedirect(reverse("api-logout"))


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    form = CustomUserChangeForm
    add_form = CustomUserCreationFom

    list_display = ["username", "email", "is_staff", "is_superuser", "tenant"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    ordering = ["email"]
    search_fields = ["email", "username"]

    fieldsets = [
        (None, {'fields': ["email", "username", "password", "tenant"]}),
        ("Permisos", {'fields': ["is_staff", "is_superuser", "is_active", "groups", "user_permissions"]}),
        ("Fechas", {'fields': ["last_login", "date_joined"]})
    ]
    """
    add_fieldsets = [
        (None, {'classes': ["wide"], 'fields': {"email", "username", "email", "is_staff", "is_superuser"}})
    ]
    """

admin_site = CustomAdminSite(name="custom_admin")
admin_site.register(CustomUser, CustomUserAdmin)
admin_site.register(OutstandingToken)
admin_site.register(BlacklistedToken)


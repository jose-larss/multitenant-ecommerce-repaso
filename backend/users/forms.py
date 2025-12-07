from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from users.models import CustomUser

class CustomUserCreationFom(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ["email", "username", "tenant"]

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ["email", "username", "is_staff", "is_superuser"]
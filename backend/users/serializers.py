from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users.models import CustomUser



class LoginUserSerializer(ModelSerializer):
    email = serializers.EmailField(required= True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["email", "password"]

    def validate(self, data):
        user = authenticate(email= data["email"], password = data["password"])
        
        if user and user.is_active:
      
            return user
        raise serializers.ValidationError("credenciales incorrectas, Correo-E o contraseña no coinciden!!")


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email"]


class RegisterUserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True,required=True,validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ["email", "username", "password"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        """
        Es lo mismo que lo de arriba
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],)
        """
        user.is_staff = True
        user.is_superuser = False
        user.save()

        try:
            from shop.models import Category
            content_type = ContentType.objects.get_for_model(Category)
            permisos = Permission.objects.filter(content_type=content_type)
            user.user_permissions.add(*permisos)
        except Exception:
            pass

        return user
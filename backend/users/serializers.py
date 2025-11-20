from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

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
        #user = authenticate(**data)
        user = authenticate(**data) #email= data["email"], password = data["password"]
        
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
        return user
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken

from .serializers import CustomUserSerializer, RegisterUserSerializer, LoginUserSerializer



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken

"""
@api_view(["POST"])
def cookie_token_refresh(request):

    # Obtener refresh token desde cookie HttpOnly
    refresh_token = request.COOKIES.get("refresh_token")

    if not refresh_token:
        return Response({"error": "Refresh token no ha sido provisto"},status=status.HTTP_401_UNAUTHORIZED)

    try:
        # Validar y crear nuevo access token
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)

        response = Response({"message": "Access token ha sido refrescado satisfactoriamente"},status=status.HTTP_200_OK)

        # Setear cookie HttpOnly
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=60 * 60 * 24  # 1 día
        )

        return response

    except InvalidToken:
        return Response({"error": "Token invalidado"},status=status.HTTP_401_UNAUTHORIZED)
"""



class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Refresh token no ha sido provisto"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"message": "Access token ha sido refrescado satisfactoriamente"}, status=status.HTTP_200_OK)
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
                max_age = 60 * 60 * 24  # 1 día
            )
            return response
        except InvalidToken:
            return Response({"error": "Token invalidado"}, status=status.HTTP_401_UNAUTHORIZED)
        


@api_view(['POST'])
def logout_view(request):
    
    refresh_token = request.COOKIES.get("refresh_token")

    if refresh_token:
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except Exception as e:
            return Response({"error": "Token invalidado" + str(e)}, status=status.HTTP_400_BAD_REQUEST)

    response = Response({"message": "Deslogado satisfactoriamente"}, status=status.HTTP_200_OK)  

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    
    return response

"""
class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                refresh.blacklist()
            except Exception as e:
                return Response({"error": "Token invalidado" + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({"message": "Deslogado satisfactoriamente"}, status=status.HTTP_200_OK)  

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        
        return response
"""


@api_view(['POST'])
def login_view(request):
    serializer = LoginUserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"user": CustomUserSerializer(user).data},status=status.HTTP_200_OK)

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age = 60 * 60 * 24  # 1 día
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age = 60 * 60 * 24  # 1 día
        )
   
        return response

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
class LoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)

        #generate tokens or our user
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken(user)
            access_token = str(refresh.access_token)

            response = Response({"user": CustomUserSerializer(user).data}, status=status.HTTP_200_OK)

            response.set_cookie(
                key="access_token", 
                value=access_token, 
                httponly=True, 
                secure=True, 
                samesite="Strict"
            )

            response.set_cookie(
                key="refresh_token", 
                value=str(refresh), 
                httponly=True, 
                secure=True, 
                samesite="Strict"
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
# LAS 2 FUNCIONES HACEN LO MISMO
"""
class me_view(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
"""

@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def me_view(request):
  
    user = request.user

    if request.method == "GET":
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method in ["PUT", "PATCH"]:
        serializer = CustomUserSerializer(
            user, 
            data=request.data, 
            partial=(request.method == "PATCH")
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
📌 ¿Qué hace esta versión?

✔ Reemplaza la class-based view RetrieveUpdateAPIView
✔ Usa decoradores:

@api_view → define los métodos HTTP permitidos

@permission_classes → aplica IsAuthenticated

Usa request.user como objeto a serializar/actualizar

✔ Mantiene exactamente la misma funcionalidad:

GET → devuelve info del usuario

PUT/PATCH → actualiza el usuario
"""


# LAS 2 FUNCIONES HACEN LO MISMO
@api_view(['POST'])
def user_registration_view(request):
    serializer = RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
class userRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer
"""


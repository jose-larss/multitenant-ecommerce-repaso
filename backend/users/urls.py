from django.urls import path

from users.views import me_view, user_registration_view, login_view, logout_view, CookieTokenRefreshView

urlpatterns = [
    path("me/", me_view),
    path("register/", user_registration_view),
    path("login/", login_view),
    path("logout/", logout_view),
    path("refresh/", CookieTokenRefreshView.as_view()),
]

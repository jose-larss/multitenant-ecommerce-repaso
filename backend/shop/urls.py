from django.urls import path

from shop import views

urlpatterns = [
    path('categories/', views.list_categories),
    path('products/<slug:categorySlug>/<slug:subCategorySlug>/', views.list_products),
]

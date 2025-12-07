from django.urls import path

from shop import views

urlpatterns = [
    path('categories/', views.list_categories),
    path('tags/', views.list_tags),

    path('products/', views.list_products),
    path('products/<slug:categorySlug>/<slug:subCategorySlug>/', views.list_products),
    path('products/<slug:categorySlug>/', views.list_products),
    
]

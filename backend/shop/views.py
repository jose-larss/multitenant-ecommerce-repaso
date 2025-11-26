from django.shortcuts import render, get_object_or_404

from shop.models import Category, SubCategory, Product
from shop.serializers import CategorySerializer, ProductSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response



@api_view(['GET'])
def list_products(request, categorySlug, subCategorySlug):
   
    # la variable de jabascripr va con undefined esto devuelve true
    if categorySlug and subCategorySlug == "undefined":
        category = get_object_or_404(Category, slug=categorySlug)
        products = Product.objects.filter(category=category)
    else:
        subCategory = get_object_or_404(SubCategory, slug=subCategorySlug)
        products = Product.objects.filter(subcategory=subCategory)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

from django.shortcuts import render, get_object_or_404
from decimal import Decimal, InvalidOperation

from shop.models import Category, SubCategory, Product, Tag
from shop.serializers import CategorySerializer, ProductSerializer, TagSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import CursorPagination
from shop.pagination import DefaultCursorPagination


"""
class TagCursorPagination(CursorPagination):
    page_size = 3
    ordering = "created_at"
"""


@api_view(['GET'])
def list_tags(request):
    tags = Tag.objects.all().order_by("created_at")
    paginator = DefaultCursorPagination()
    page = paginator.paginate_queryset(tags, request)

    serializer = TagSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
def list_products(request, categorySlug, subCategorySlug=""):
    # --- parseo seguro de precios ---
    def parse_decimal(value):
        if value is None or value == "" or value == "null":
            return None
        try:
            return Decimal(str(value))
        except (InvalidOperation, ValueError, TypeError):
            return None

    # la variable de javascript va con undefined esto devuelve true
    category = get_object_or_404(Category, slug=categorySlug)
    products = Product.objects.filter(category=category)

    if subCategorySlug:
        subCategory = get_object_or_404(SubCategory, slug=subCategorySlug)
        products = Product.objects.filter(category=category, subcategory=subCategory)

    min_price = parse_decimal(request.GET.get("minPrice"))
    max_price = parse_decimal(request.GET.get("maxPrice"))
    tags = request.GET.getlist("tags") # se recibe asi ["foo", bar, test"]
    sort = request.GET.get("sort")

    if sort == "tendencia":
        products = products.order_by("created_at")

    if sort == "caliente_y_nuevo":
        products = products.order_by("name")   

    if len(tags) > 0:
        tags = tags[0].split(",") # se convierte ["foo", "bar", "test"]
      
    if min_price is not None:
        products = products.filter(price__gte=Decimal(min_price))

    if max_price is not None:
        products = products.filter(price__lte=Decimal(max_price))
    
    if len(tags) >= 1 and tags[0] != "":
        products = products.filter(tags__name__in=tags)
  
    products = products.distinct() # muy importante a la hora de concatenar tags

    paginator = DefaultCursorPagination()
    page = paginator.paginate_queryset(products, request)

    serializer = ProductSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

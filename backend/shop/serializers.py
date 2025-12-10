from rest_framework import serializers

from shop.models import Category, SubCategory, Product, Tag, Tenant


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ['id', 'name', 'slug', 'imagen', 'stripeAccountId', 'stripeDetailsSubmitted', 'created_at', 'updated_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'created_at', 'updated_at']


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'created_at', 'updated_at']


class CategorySerializer(serializers.ModelSerializer):
    subcategorias = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at', 'subcategorias']


class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at']


class ProductSerializer(serializers.ModelSerializer):
    category = CategoryProductSerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    tenant = TenantSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "slug", 'imagen',
                  "description", "price", "refundpolicy", 'created_at', 'updated_at', "category", "subcategory", "tenant"] # a falta de imagen
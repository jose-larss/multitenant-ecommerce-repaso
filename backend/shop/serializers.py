from rest_framework import serializers

from shop.models import Category, SubCategory



class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'created_at', 'updated_at']


class CategorySerializer(serializers.ModelSerializer):
    subcategorias = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'color', 'created_at', 'updated_at', 'subcategorias']
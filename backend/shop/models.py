import uuid

from django.db import models


from smart_selects.db_fields import ChainedForeignKey


class Tenant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True, help_text="Nombre Tienda, Este es el nombre de la tienda (e.g Tienda Antonio)")
    slug = models.SlugField(unique=True, help_text="Este es el subdominio de la tienda (e.g [slug].funroad.com)")
    imagen = models.ImageField(upload_to="tenants/", default="", blank=True, null=True)
    stripeAccountId = models.CharField(max_length=255)
    stripeDetailsSubmitted = models.BooleanField(default=False, help_text="Tu no puedes crear products has que valides, los detalles de Stripe")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Arrendatario"
        verbose_name_plural = "Arrendatarios"

    def __str__(self):
        return self.name



class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)
    color = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ["name"]

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategorias")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Subcategoría"
        verbose_name_plural = "Subcategorías"
        constraints = [
            models.UniqueConstraint(fields=["category", "name"], name="unique_subcategory_per_category")
        ]
        ordering = ["name"]

    def __str__(self):
        return self.name


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Etiqueta"
        verbose_name_plural = "Etiquetas"

    def __str__(self):
        return self.name


REFUND = (
    ("30-días", "30-días"),
    ("14-días", "14-días"),
    ("7-días", "7-días"),
    ("1-días", "1-días"),
    ("no-reembolso", "no-reembolso"),
)
   

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00, help_text="Precio en EUR")
    imagen = models.ImageField(upload_to="products/", default="", blank=True, null=True)
    refundpolicy = models.CharField(max_length=30, choices=REFUND, default="30-días")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product_category")
    subcategory = ChainedForeignKey(
        SubCategory,
        chained_field="category",
        chained_model_field="category",
        show_all=False,
        auto_choose=True,
        sort=True,
        null=True,
        blank=True,   # ⚠️ Para que no falle si la categoría no tiene subcategorías
        help_text="Clicke primero la categoria, para que despliegue las subcategorias"
    )
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="product_tenant", null=True, blank=True)
    tags = models.ManyToManyField(Tag)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.name



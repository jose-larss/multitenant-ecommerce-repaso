import json
from django.core.management.base import BaseCommand

from shop.models import Category, SubCategory, Product

class Command(BaseCommand):
    help = "Carga productos desde un archivo Json"

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            type=str, 
            help="Ruta al archivo JSON con productos",
            default="products.json",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Borra todos los productos antes de cargarlas"
        )

    def handle(self, *args, **options):
        file_path = options["file"]
        reset = options["reset"]

        #si viene con --reset borramos todo antes
        if reset:
            self.stdout.write(self.style.WARNING("Borrando todos los productos"))
            Product.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("Tabla limpiadas"))

        # Intentar abrir el Json
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Archivo {file_path} no encontrado"))
            return

        # Insertar categorias y subcategorias
        for product in data:
            category = Category.objects.get(slug=product["category"])
            try:
                subcategory = SubCategory.objects.get(slug=product.get("subcategory"))
            except SubCategory.DoesNotExist:
                subcategory = None

            product, created = Product.objects.get_or_create(
                slug = product["slug"],
                defaults={
                    "name": product["name"],
                    "description": product["description"],
                    "price": product["price"],
                    "imagen": product["imagen"],
                    "refundpolicy": product["refundpolicy"],
                    "category": category,
                    "subcategory": subcategory,
                }, 
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Producto creado: {product.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Producto ya existia: {product.name}"))
            
              
            self.stdout.write(self.style.SUCCESS("Importación finalizada"))   
import json
from django.core.management.base import BaseCommand

from shop.models import Category, SubCategory

class Command(BaseCommand):
    help = "Carga categorias y subcategorias desde un archivo Json"

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            type=str, 
            help="Ruta al archivo JSON con categorías",
            default="categories.json",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Borra todas las categorias y subcategorias antes de cargarlas"
        )

    def handle(self, *args, **options):
        file_path = options["file"]
        reset = options["reset"]

        #si viene con --reset borramos todo antes
        if reset:
            self.stdout.write(self.style.WARNING("Borrando todas las categorias y subcategorias"))
            SubCategory.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("Tablas limpiadas"))

        # Intentar abrir el Json
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Archivo {file_path} no encontrado"))
            return

        # Insertar categorias y subcategorias
        for cat in data:
            category, created = Category.objects.get_or_create(
                slug = cat["slug"],
                defaults={
                    "name": cat["name"],
                    "color": cat.get("color", "#000000"),
                }, 
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Categoria creada: {category.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Categoria ya existia: {category.name}"))
            
            for sub in cat.get("subcategories", []):
                subcategory, sub_created = SubCategory.objects.get_or_create(
                    slug = sub["slug"],
                    defaults={
                        "name": sub["name"],
                        "category": category,
                    },
                )
                if sub_created:
                    self.stdout.write(self.style.SUCCESS(f"Subcategoria creada: {subcategory.name}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Subcategoria ya existia: {subcategory.name}"))  

            self.stdout.write(self.style.SUCCESS("Importación finalizada"))                  
from rest_framework.pagination import CursorPagination

class DefaultCursorPagination(CursorPagination):
    page_size = 3
    ordering = "-created_at"
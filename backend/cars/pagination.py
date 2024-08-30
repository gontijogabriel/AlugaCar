from rest_framework import pagination
from rest_framework.response import Response

class CarsPagination(pagination.PageNumberPagination):
    page_size = 12

    def get_paginated_response(self, data):
        return Response({
            'page_size': self.page_size,
            'count': self.page.paginator.count,
            'next': self.get_next_page_number(),
            'previous': self.get_previous_page_number(),
            'total_results': self.page.paginator.count,
            'results': data
        })

    def get_next_page_number(self):
        if not self.page.has_next():
            return None
        next_page_number = self.page.next_page_number()
        return next_page_number

    def get_previous_page_number(self):
        if not self.page.has_previous():
            return None
        previous_page_number = self.page.previous_page_number()
        return previous_page_number
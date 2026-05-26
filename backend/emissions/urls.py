from django.urls import path

from .views import *

urlpatterns = [

    path(
        'upload/',
        UploadCSVView.as_view()
    ),

    path(
        'records/',
        RecordsView.as_view()
    ),

    path(
        'approve/<int:pk>/',
        ApproveRecordView.as_view()
    ),
]
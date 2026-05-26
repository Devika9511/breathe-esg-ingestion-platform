from rest_framework import serializers

from .models import EmissionRecord


class EmissionRecordSerializer(
    serializers.ModelSerializer
):

    source_type = serializers.CharField(
        source='source.source_type',
        read_only=True
    )

    class Meta:

        model = EmissionRecord

        fields = '__all__'
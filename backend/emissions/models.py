from django.db import models


class Company(models.Model):

    name = models.CharField(
        max_length=255
    )


class DataSource(models.Model):

    SOURCE_CHOICES = [

        ("SAP", "SAP"),

        ("UTILITY", "UTILITY"),

        ("TRAVEL", "TRAVEL"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )


class EmissionRecord(models.Model):

    STATUS_CHOICES = [

        ("PENDING", "PENDING"),

        ("APPROVED", "APPROVED"),

        ("REJECTED", "REJECTED"),
    ]

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    category = models.CharField(
        max_length=255
    )

    scope = models.CharField(
        max_length=50
    )

    amount = models.FloatField()

    unit = models.CharField(
        max_length=50
    )

    normalized_value = models.FloatField(
        default=0
    )

    emission_factor = models.FloatField(
        default=0
    )

    co2e_emissions = models.FloatField(
        default=0
    )

    record_date = models.DateField()

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    is_flagged = models.BooleanField(
        default=False
    )

    validation_error = models.TextField(
        blank=True,
        null=True
    )

    analyst_note = models.TextField(
        blank=True,
        null=True
    )

    locked_for_audit = models.BooleanField(
        default=False
    )


class AuditLog(models.Model):

    record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=255
    )

    timestamp = models.DateTimeField(
        auto_now_add=True
    )
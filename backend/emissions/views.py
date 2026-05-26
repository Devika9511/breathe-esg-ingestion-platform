import os
import pandas as pd
import PyPDF2

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

# =========================
# EMISSION FACTORS
# =========================

EMISSION_FACTORS = {

    "SAP": 2.68,

    "UTILITY": 0.82,

    "TRAVEL": 0.15,
}


# =========================
# VALIDATION FUNCTION
# =========================

def validate_record(amount):

    if amount <= 0:
        return True

    if amount > 100000:
        return True

    return False


# =========================
# UPLOAD VIEW
# =========================

class UploadCSVView(APIView):

    def post(self, request):

        uploaded_file = request.FILES.get(
            'file'
        )

        if not uploaded_file:

            return Response({
                "error":
                "No file uploaded"
            }, status=400)

        source_type = request.data.get(
            'source_type'
        )

        filename = uploaded_file.name.lower()

        file_extension = os.path.splitext(
            filename
        )[1]

        company, _ = Company.objects.get_or_create(
            name="Demo Company"
        )

        source = DataSource.objects.create(
            company=company,
            source_type=source_type
        )

        # =========================
        # PDF SUPPORT
        # =========================

        if file_extension == ".pdf":

            try:

                pdf_reader = PyPDF2.PdfReader(
                    uploaded_file
                )

                extracted_text = ""

                for page in pdf_reader.pages:

                    extracted_text += (
                        page.extract_text()
                    )

                EmissionRecord.objects.create(

                    source=source,

                    category=
                        "PDF Upload Review",

                    scope="Scope 2",

                    amount=0,

                    unit="PDF",

                    normalized_value=0,

                    emission_factor=0,

                    co2e_emissions=0,

                    record_date=
                        "2026-01-01",

                    is_flagged=True,

                    validation_error=
                        "PDF uploaded. Analyst review required.",

                    analyst_note=
                        extracted_text[:500]
                )

                return Response({
                    "message":
                    "PDF uploaded successfully"
                })

            except Exception as e:

                return Response({
                    "error": str(e)
                }, status=400)

        # =========================
        # TXT SUPPORT
        # =========================

        elif file_extension == ".txt":

            content = uploaded_file.read().decode(
                "utf-8"
            )

            EmissionRecord.objects.create(

                source=source,

                category=
                    "TXT Upload Review",

                scope="Scope 3",

                amount=0,

                unit="TXT",

                normalized_value=0,

                emission_factor=0,

                co2e_emissions=0,

                record_date=
                    "2026-01-01",

                is_flagged=True,

                validation_error=
                    "TXT uploaded. Analyst review required.",

                analyst_note=content[:500]
            )

            return Response({
                "message":
                "TXT uploaded successfully"
            })

        # =========================
        # XLSX SUPPORT
        # =========================

        elif file_extension == ".xlsx":

            df = pd.read_excel(
                uploaded_file
            )

        # =========================
        # CSV SUPPORT
        # =========================

        elif file_extension == ".csv":

            df = pd.read_csv(
                uploaded_file
            )

        else:

            return Response({
                "error":
                "Unsupported file type"
            }, status=400)

        # =========================
        # SAP DATA
        # =========================

        if source_type == "SAP":

            for _, row in df.iterrows():

                amount = float(
                    row['fuel_volume']
                )

                factor = EMISSION_FACTORS[
                    "SAP"
                ]

                emissions = (
                    amount * factor
                )

                flagged = validate_record(
                    amount
                )

                EmissionRecord.objects.create(

                    source=source,

                    category=row[
                        'material_desc'
                    ],

                    scope="Scope 1",

                    amount=amount,

                    unit=row[
                        'fuel_unit'
                    ],

                    normalized_value=amount,

                    emission_factor=factor,

                    co2e_emissions=
                        emissions,

                    record_date=row[
                        'posting_date'
                    ],

                    is_flagged=flagged,

                    validation_error=(
                        "Suspicious amount"
                        if flagged
                        else ""
                    )
                )

        # =========================
        # UTILITY DATA
        # =========================

        elif source_type == "UTILITY":

            for _, row in df.iterrows():

                amount = float(
                    row['kwh_usage']
                )

                factor = EMISSION_FACTORS[
                    "UTILITY"
                ]

                emissions = (
                    amount * factor
                )

                flagged = validate_record(
                    amount
                )

                EmissionRecord.objects.create(

                    source=source,

                    category=
                        "Electricity",

                    scope="Scope 2",

                    amount=amount,

                    unit="kWh",

                    normalized_value=amount,

                    emission_factor=factor,

                    co2e_emissions=
                        emissions,

                    record_date=row[
                        'billing_period_end'
                    ],

                    is_flagged=flagged,

                    validation_error=(
                        "Suspicious amount"
                        if flagged
                        else ""
                    )
                )

        # =========================
        # TRAVEL DATA
        # =========================

        elif source_type == "TRAVEL":

            for _, row in df.iterrows():

                amount = float(
                    row['distance_km']
                )

                factor = EMISSION_FACTORS[
                    "TRAVEL"
                ]

                emissions = (
                    amount * factor
                )

                flagged = validate_record(
                    amount
                )

                EmissionRecord.objects.create(

                    source=source,

                    category=row[
                        'trip_type'
                    ],

                    scope="Scope 3",

                    amount=amount,

                    unit="KM",

                    normalized_value=amount,

                    emission_factor=factor,

                    co2e_emissions=
                        emissions,

                    record_date=
                        "2026-01-01",

                    is_flagged=flagged,

                    validation_error=(
                        "Suspicious amount"
                        if flagged
                        else ""
                    )
                )

        return Response({
            "message":
            "File uploaded successfully"
        })


# =========================
# RECORDS VIEW
# =========================

class RecordsView(APIView):

    def get(self, request):

        records = (
            EmissionRecord.objects
            .all()
            .order_by('-id')
        )

        serializer = EmissionRecordSerializer(
            records,
            many=True
        )

        return Response(
            serializer.data
        )


# =========================
# APPROVE VIEW
# =========================

class ApproveRecordView(APIView):

    def patch(self, request, pk):

        record = EmissionRecord.objects.get(
            id=pk
        )

        analyst_note = request.data.get(
            "analyst_note",
            "Approved by analyst"
        )

        record.status = "APPROVED"

        record.locked_for_audit = True

        record.analyst_note = analyst_note

        record.save()

        AuditLog.objects.create(

            record=record,

            action="Approved"
        )

        return Response({
            "message": "Approved"
        })
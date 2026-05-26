def validate_record(amount, unit):

    flagged = False

    if amount <= 0:
        flagged = True

    allowed_units = [
        'Liters',
        'kWh',
        'KM'
    ]

    if unit not in allowed_units:
        flagged = True

    return flagged
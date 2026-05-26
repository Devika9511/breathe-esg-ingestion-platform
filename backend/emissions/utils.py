EMISSION_FACTORS = {

    "Diesel Fuel": 2.68,

    "Manufacturing Gasoline": 2.31,

    "Industrial Fuel Oil": 3.10,

    "Electricity": 0.82,

    "Flight": 0.15,

    "Hotel Stay": 12.5,
}


def normalize_unit(amount, unit):

    conversions = {

        "Liters": amount,

        "kWh": amount,

        "KM": amount,
    }

    return conversions.get(unit, amount)


def get_emission_factor(category):

    return EMISSION_FACTORS.get(
        category,
        0
    )
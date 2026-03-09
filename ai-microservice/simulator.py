import time
import random
import requests

API_URL = "http://127.0.0.1:5002/api/simulation/events"

SIGNALS = ["SIG-001", "SIG-002", "SIG-003", "SIG-004"]
LOCATIONS = [
    "Downtown Main Intersection",
    "Highway Exit 42",
    "City Center Mall",
    "Hospital Road Junction"
]
VIOLATION_TYPES = [
    "Red Light Jump",
    "Over-speeding",
    "Wrong Lane",
    "No Helmet"
]

def generate_random_plate():
    letters = "".join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ", k=3))
    numbers = "".join(random.choices("0123456789", k=4))
    return f"{letters}-{numbers}"

def simulate_density():
    density_levels = ["Low", "Medium", "High", "Severe"]
    signal = random.choice(SIGNALS)
    density = random.choice(density_levels)
    status = "RED"
    if density in ["High", "Severe"]:
        status = "GREEN" # AI overriding signal due to high density
        
    payload = {
        "eventType": "TRAFFIC_DENSITY_UPDATE",
        "data": {
            "signalId": signal,
            "density": density,
            "suggestedStatus": status
        }
    }
    print(f"[AI Camera] Sending Density Update: {signal} -> {density}")
    try:
        requests.post(API_URL, json=payload)
    except Exception as e:
        print("Server not reachable")

def simulate_anpr():
    data = {
        "plateNumber": generate_random_plate(),
        "violationType": random.choice(VIOLATION_TYPES),
        "location": random.choice(LOCATIONS),
        "fineAmount": random.randint(100, 500)
    }
    payload = {
        "eventType": "ANPR_VIOLATION",
        "data": data
    }
    print(f"[ANPR Cam] Detected Violation: {data['violationType']} by {data['plateNumber']}")
    try:
        requests.post(API_URL, json=payload)
    except Exception as e:
        print("Server not reachable")

def simulate_accident():
    data = {
        "location": random.choice(LOCATIONS),
        "vehiclesInvolved": random.randint(1, 4)
    }
    payload = {
        "eventType": "ACCIDENT_DETECTED",
        "data": data
    }
    print(f"[CCTV AI] CRITICAL: Accident detected at {data['location']}")
    try:
        requests.post(API_URL, json=payload)
    except Exception as e:
        print("Server not reachable")

def simulate_emergency():
    data = {
        "location": random.choice(LOCATIONS),
        "vehicleType": random.choice(["Ambulance", "Fire Truck"]),
        "route": [random.choice(SIGNALS), random.choice(SIGNALS)] # Mock route
    }
    payload = {
        "eventType": "EMERGENCY_VEHICLE_DETECTED",
        "data": data
    }
    print(f"[GPS/AI] Emergency Vehicle {data['vehicleType']} detected at {data['location']}")
    try:
        requests.post(API_URL, json=payload)
    except Exception as e:
        print("Server not reachable")

def simulate_weather():
    weather_cond = random.choice(["Heavy Rain", "Fog", "Snowstorm", "Clear"])
    data = {
        "condition": weather_cond,
        "location": "City-Wide"
    }
    payload = {
        "eventType": "WEATHER_UPDATE",
        "data": data
    }
    print(f"[Weather API] Current Condition: {weather_cond}")
    try:
        requests.post(API_URL, json=payload)
    except Exception as e:
        print("Server not reachable")

def simulate_parking():
    parking_lots = [
        {"id": "P-001", "name": "Downtown Central Plaza"},
        {"id": "P-002", "name": "Mall Underground"},
        {"id": "P-003", "name": "Hospital Visitor Parking"}
    ]
    lot = random.choice(parking_lots)
    available = random.randint(0, 50)
    
    payload = {
        "parkingId": lot["id"],
        "availableSlots": available
    }
    print(f"[IoT Parking] {lot['name']} has {available} slots available.")
    try:
        requests.post("http://127.0.0.1:5002/api/parking/update", json=payload)
    except Exception as e:
        print("Server not reachable")

if __name__ == "__main__":
    print("Starting AI Traffic Simulator...")
    print("This microservice emulates hardware cameras and YOLO models.")
    
    while True:
        event_choice = random.choices(
            ["density", "anpr", "accident", "emergency", "weather", "parking"],
            weights=[35, 25, 10, 10, 10, 10], 
            k=1
        )[0]
        
        if event_choice == "density":
            simulate_density()
        elif event_choice == "anpr":
            simulate_anpr()
        elif event_choice == "accident":
            simulate_accident()
        elif event_choice == "emergency":
            simulate_emergency()
        elif event_choice == "weather":
            simulate_weather()
        elif event_choice == "parking":
            simulate_parking()
            
        time.sleep(random.randint(4, 10))

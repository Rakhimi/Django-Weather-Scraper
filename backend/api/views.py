import json
import os
from datetime import datetime
from django.http import JsonResponse
from .scraper import scrape_weather_data
from django.conf import settings

# Path to weather_data.json
DATA_FILE_PATH = os.path.join(settings.BASE_DIR, 'api', 'data', 'weather_data.json')

def load_weather_data():
    try:
        with open(DATA_FILE_PATH, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_weather_data(data):
    with open(DATA_FILE_PATH, 'w') as file:
        json.dump(data, file, indent=4)

def weather_view(request):
    
    weather_data = load_weather_data()

    
    state = request.GET.get('state')
    print(f"State received: {state}")

    if state:
       
        state_data = []

        
        for entry in weather_data:
            
            matching_weather = [item for item in entry.get('weather', []) if item.get('city') == state]

            if matching_weather:
                state_data.append({
                    'date': entry.get('date'),
                    'weather': matching_weather
                })

        if state_data:
            
            return JsonResponse({
                'state': state,
                'weather_data': state_data,
            }, safe=False)
        else:
            return JsonResponse({'error': f'No weather data found for state: {state}'}, status=404)


    else:
        
        today = datetime.now().strftime('%Y-%m-%d')

        
        today_data = next((entry for entry in weather_data if entry.get('date') == today), None)

        if today_data:
            
            return JsonResponse(today_data)
        else:
            
            new_weather_data = scrape_weather_data()

            if new_weather_data:
                
                new_weather_data['date'] = today

                weather_data.append(new_weather_data)

                save_weather_data(weather_data)

                return JsonResponse(new_weather_data)
            else:
                
                return JsonResponse({'error': 'Weather data could not be retrieved'}, status=500)

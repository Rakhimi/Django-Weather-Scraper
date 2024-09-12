# weather/scraper.py

import requests
from bs4 import BeautifulSoup

def scrape_weather_data():
    
    url = 'https://www.accuweather.com/en/my/malaysia-weather#google_vignette'
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com'
    }
    
    response = requests.get(url, headers=headers)

    print(f"Status Code: {response.status_code}")
    if response.status_code != 200:
        print("Failed to retrieve page")
        return None

    soup = BeautifulSoup(response.content, 'html.parser')

    weather_summary = []
    weather_items = soup.find_all('a', class_='nearby-location') 

    for item in weather_items:
        city = item.find('span', class_='title').text.strip() 
        temperature = item.find('span', class_='temp').text.strip() 

        svg_tag = item.find('svg')
        
        condition_icon = svg_tag['data-src'] 

        weather_summary.append({
            'city': city,
            'temperature': temperature,
            'condition_icon': condition_icon
        })

    return {
        'weather': weather_summary,
        'status_code': response.status_code
    }

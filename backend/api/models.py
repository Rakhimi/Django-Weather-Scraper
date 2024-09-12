from django.db import models

# Create your models here.

class Weather(models.Model):
    state_name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True) 
    temperature = models.FloatField()
    condition_icon = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.state_name} - {self.date} - {self.temperature}°C"
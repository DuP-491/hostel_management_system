from django.apps import AppConfig

class MessConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Mess'

    def ready(self):
        import Mess.signals
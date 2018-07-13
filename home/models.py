from django.db import models


from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel

class HomePage(Page):
    page_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    promote_panels = [
        ImageChooserPanel('page_image'),
    ]

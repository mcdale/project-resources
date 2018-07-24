from django import forms
from django.core.validators import MinLengthValidator
from django.db import models

from treebeard.mp_tree import MP_Node

from wagtail.admin.edit_handlers import FieldPanel

# Create your models here.
class StructureNode(MP_Node):
    """Represents a single nestable Node"""

    # editable fields
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text='Keep the name short, ideally one word.',
        validators=[MinLengthValidator(5)]
    )
    aliases = models.TextField('Also known as',
        max_length=255,
        blank=True,
        help_text='What else is this known as?'
    )

    # tree-specific attrs
    node_order_index = models.IntegerField(
        blank=True,
        default=0,
        editable=False
    )
    node_child_verbose_name = 'child'
    node_order_by = ['node_order_index', 'name']

    panels = [
        FieldPanel('parent'),
        FieldPanel('name'),
        FieldPanel('aliases', widget=forms.Textarea(attrs={'rows': '5'})),
    ]

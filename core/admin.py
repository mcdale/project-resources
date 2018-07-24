from wagtail.contrib.modeladmin.options import ModelAdmin

from .models import StructureNode

class StructureNodeAdmin(ModelAdmin):
    model = StructureNode

    menu_icon = 'fa-cube'
    menu_order = 800

    list_per_page = 50
    list_display = ('name', 'get_parent', 'aliases')
    search_fields = ('name', 'aliases')

    inspect_view_enabled = True
    inspect_view_fields = ('name', 'get_parent', 'aliases', 'id')

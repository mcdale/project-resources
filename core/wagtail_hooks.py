from .forms import StructureNodeForm
from .admin import StructureNodeAdmin

from wagtail.contrib.modeladmin.options import modeladmin_register

modeladmin_register(StructureNodeAdmin)

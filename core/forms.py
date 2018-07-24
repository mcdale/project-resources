from django import forms
from django.core.validators import MinLengthValidator
from django.db import models

from treebeard.mp_tree import MP_Node

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.forms import WagtailAdminModelForm

from .models import StructureNode


class BasicNodeChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        depth_line = '-' * (obj.get_depth() - 1)
        return "{} {}".format(depth_line, super().label_from_instance(obj))


class StructureNodeForm(WagtailAdminModelForm):
    parent = BasicNodeChoiceField(
        required=True,
        queryset=StructureNode.objects.all(),
        empty_label=None,
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs['instance']

        if instance.is_root() or StructureNode.objects.count() is 0:
            # hide and disable the parent fields
            self.fields['parent'].disabled = True
            self.fields['parent'].required = False
            self.fields['parent'].empty_label = 'N/A - Root Node'
            self.fields['parent'].widget = forms.HiddenInput()

            self.fields['name'].label += ' (Root)'
        elif instance.id:
            self.fields['parent'].initial = instance.get_parent()

    def save(self, commit=True, *args, **kwargs):
        instance = super().save(commit=False, *args, **kwargs)
        parent = self.cleaned_data['parent']

        if not commit:
            return instance

        if instance.id is None:
            if StructureNode.objects.all().count() is 0:
                StructureNode.add_root(instance=instance)
            else:
                instance = parent.add_child(instance=instance)
        else:
            instance.save()
            if instance.get_parent()!=parent:
                instance.move(parent, pos='sorted-child')
        return instance

StructureNode.base_form_class = StructureNodeForm

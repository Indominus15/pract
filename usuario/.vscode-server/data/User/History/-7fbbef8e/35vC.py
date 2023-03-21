#este odoo es la base no te confundas
from odoo import models,fields

class PlantillaModulo(models.Model):
    _name = 'plantilla.modulo'
    _description = 'plantilla'
    name = fields.Char(string='name')
    description = fields.Text(string='description')
    date = fields.Date(string='date')

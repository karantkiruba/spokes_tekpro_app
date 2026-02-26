# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in spokes_tekpro_app/__init__.py
from spokes_tekpro_app import __version__ as version

setup(
	name='spokes_tekpro_app',
	version=version,
	description='spokes_tekpro_app',
	author='spokes',
	author_email='kirubakaran.t@sybergate.co.in',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

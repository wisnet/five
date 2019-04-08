#!/bin/bash
cd ..
pip3 install --user --upgrade pip
pip3 install --user --upgrade pymdown-extensions pygments mkdocs mkdocs-material pymdown-extensions mdx-gh-links
pip3 show mkdocs-material | grep -E ^Version
mkdocs gh-deploy
rm -fr ./site/

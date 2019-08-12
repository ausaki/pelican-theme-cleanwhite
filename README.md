a [pelican](https://blog.getpelican.com/) theme.

requirements:

- `pip install pymdown-extensions`

- pelican plugin: [neighbors](https://github.com/getpelican/pelican-plugins/tree/master/neighbors)

suggest pelicanconf.py:

```py
#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = "ausaki"
SITENAME = "ausaki"
SITEURL = ""
GOOGLE_SEARCH_HOSTNAME = 'ausaki.github.io'
PATH = "content"

TIMEZONE = "Asia/Shanghai"

DEFAULT_LANG = "cn"
DEFAULT_DATE = "fs"
DEFAULT_DATE_FORMAT = "%Y/%m/%d"


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
)

DEFAULT_PAGINATION = 10
PAGINATED_TEMPLATES = {"index": None, "tag": None, "category": None, "author": None}

# Markdown
import pymdownx.superfences as superfences
import pymdownx.arithmatex as arithmatex

MARKDOWN = {
    "extension_configs": {
        "pymdownx.superfences": {
            "custom_fences": [
                {
                    "name": "flow",
                    "class": "uml-flowchart",
                    "format": superfences.fence_code_format,
                },
                {
                    "name": "sequence",
                    "class": "uml-sequence-diagram",
                    "format": superfences.fence_code_format,
                },
                {"name": "math", "class": "arithmatex", "format": arithmatex.inline_mathjax_format}
            ]
        },
        "pymdownx.highlight": {
            "use_pygments": True,
            "css_class": "block-code-hl",
            "linenums": True,
            "linenums_style": "pymdownx-inline",
        },
        "pymdownx.inlinehilite": {"css_class": "inline-code-hl"},
        "pymdownx.arithmatex": {},
        "markdown_cjk_spacing.cjk_spacing": {},
    },
    "tab_length": 2,
}

# theme
THEME = "clean_white"

SLUGIFY_SOURCE = "basename"

# url
ARTICLE_URL = "/posts/{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
ARTICLE_SAVE_AS = "posts/{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
CATEGORY_URL = "/category/{slug}.html"
CATEGORY_SAVE_AS = "category/{slug}.html"
TAG_URL = "/tag/{slug}.html"
TAG_SAVE_AS = "tag/{slug}.html"
YEAR_ARCHIVE_SAVE_AS = "posts/{date:%Y}/index.html"
MONTH_ARCHIVE_SAVE_AS = "posts/{date:%Y}/{date:%m}/index.html"

# plugins
PLUGIN_PATHS = ["pelican-plugins/"]
PLUGINS = ["neighbors"]  # 提供上一篇/下一篇文章的插件

JINJA_ENVIRONMENT = {"extensions": ["jinja2.ext.loopcontrols"]}
```
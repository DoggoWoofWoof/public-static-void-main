"""
Logging configuration.
"""

import logging
import sys

from app.core.config import settings


def setup_logging():
    level = logging.DEBUG if settings.APP_ENV == "development" else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )


logger = logging.getLogger("borderbridge")
setup_logging()

"""Utility functions for visnetwork panel."""

import base64


def data_url_to_bytes(data_url: str) -> bytes:
    """Convert a data URL to bytes.

    Args:
        data_url: The data URL to convert (e.g., "data:image/png;base64,...").

    Returns:
        The decoded bytes from the data URL.
    """
    header, encoded = data_url.split(",", 1)
    data = base64.b64decode(encoded)
    return data

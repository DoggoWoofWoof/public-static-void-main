"""Supabase client — primary data store connection."""

from supabase import create_client, Client
from app.core.config import settings


def get_supabase_client() -> Client:
    """Returns a Supabase client. Primary implementation: Supabase.
    Fallback to JSON repo only if Supabase setup fails."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise RuntimeError(
            "SUPABASE_URL and SUPABASE_KEY must be set. "
            "Check your .env file. See .env.example for template."
        )
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


# Lazy singleton
_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        _client = get_supabase_client()
    return _client

from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "BorderBridge API"
    VERSION: str = "0.1.0"
    
    # Supabase (optional for demo)
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    
    # JWT / Security (mocked for demo)
    JWT_SECRET: str = "hackathon-secret-do-not-use-in-prod"
    
    # Mode
    REPO_BACKEND: str = "json" # 'json' or 'supabase'
    DEBUG: bool = True
    
    CORS_ORIGINS: list[str] = ["*"]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    xai_api_key: str = ""
    xai_model: str = "grok-4.5"
    xai_base_url: str = "https://api.x.ai/v1"
    cors_origins: str = "http://localhost:3000,http://localhost:8080"
    host: str = "0.0.0.0"
    port: int = 8000
    starting_cash: float = 1_000_000
    fee_bps: float = 0.00155
    tape_ttl_s: float = 12
    news_ttl_s: float = 120

    @property
    def cors_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

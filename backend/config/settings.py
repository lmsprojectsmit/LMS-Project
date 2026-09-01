import os


class Settings:
    APP_NAME: str = "MA25C02 Adaptive Linear Algebra LMS"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        # url need to provide
        "postgresql+psycopg://lms:lms_dev_password@localhost:5432/lms"
    )
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"


settings = Settings()
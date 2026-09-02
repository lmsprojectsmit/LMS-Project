from fastapi import FastAPI

from routes.diagnostic import router as diagnostic_router


app = FastAPI(
    title="MA25C02 Adaptive Linear Algebra LMS",
    version="1.0.0",
)


app.include_router(diagnostic_router)


@app.get("/health")
def health():
    return {"status": "ok"}
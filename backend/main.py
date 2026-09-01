from fastapi import FastAPI

app = FastAPI(
    title="MA25C02 Adaptive Linear Algebra LMS",
    version="1.0.0",
)


@app.get("/health")
def health():
    return {"status": "ok"}
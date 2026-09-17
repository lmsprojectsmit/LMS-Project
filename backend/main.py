from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import engine, Base
from models import micro_unit, learning_resource, prerequisite, question, attempt, response, mastery

# Tables will be created during startup to avoid connection issues on worker fork

from routes.diagnostic import router as diagnostic_router
from routes.micro_units import router as micro_units_router
from routes.attempts import router as attempts_router
from routes.mastery import router as mastery_router
from routes.auth import router as auth_router

app = FastAPI(
    title="MA25C02 Adaptive Linear Algebra LMS",
    version="1.0.0",
)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://adaptive-linear-algebra-lms.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(diagnostic_router)
app.include_router(micro_units_router)
app.include_router(attempts_router)
app.include_router(mastery_router)
app.include_router(auth_router)


@app.get("/health")
def health():
    return {"status": "ok"}
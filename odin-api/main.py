from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "ODIN-API NOT FOUND"

@app.get("/sar_image")
async def sar_image():
    with open("./SAR_image_20420212.png", "rb") as img:
        image_data = img.read()
    return Response(content=image_data, media_type="image/png")


from fastapi import FastAPI
from fastapi.responses import Response

app = FastAPI()


@app.get("/")
async def root():
    return "ODIN-API NOT FOUND"

@app.get("/sar_image")
async def sar_image():
    with open("./SAR_image_20420212.png", "rb") as img:
        image_data = img.read()
    return Response(content=image_data, media_type="image/png")


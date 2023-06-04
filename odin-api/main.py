from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from overpy import Overpass

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


@app.get("/lighthouses")
async def lighthouses():
    api = Overpass()

    # fetch lighthouse locations from openstreetmap
    query = """
    [out:json][timeout:25];
    // gather results
    (
      // query part for: “"seamark:light:range"=*”
      node["seamark:light:range"](59,22,60,23);
      way["seamark:light:range"](59,22,60,23);
      relation["seamark:light:range"](58,22,62,23);
    );
    // print results
    out body;
    """

    result = api.query(query)
    print(result.get_nodes())
    locations = [(i.lat, i.lon) for i in result.get_nodes()]
    return locations


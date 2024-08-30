import io
import pandas as pd
import data_processing
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# Set the maximum file size (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # allowed origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
async def main():
    return {"message": "I am in Data Croft Backend!"}


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Check if the file is a CSV
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400,
                            detail="Invalid file format. Please upload a CSV file.")

    # Read the file content and check its size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File size exceeds 10MB limit.")

    # Try reading the file as a CSV
    try:
        pd.read_csv(io.StringIO(contents.decode('utf-8')))
    except pd.errors.ParserError:
        raise HTTPException(status_code=400, detail="Invalid file content. Unable to parse CSV.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An unexpected error occurred: {str(e)}")

    return {"filename": file.filename}


@app.get("/dashboard/")
async def data_pre_processing():
    # sending the dataframe for data cleaning
    file_path = './data/cost_of_living_2024.csv'
    data = pd.read_csv(file_path)
    return await data_processing.processing(data=data)

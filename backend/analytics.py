import pandas as pd
import processing
from fastapi.responses import JSONResponse


async def analytics():
    try:
        # fetching cleaner data with additional statistics
        result, data_no_outliers = await processing.processing()

        # Top N i.e. 10 rows
        top_rows = data_no_outliers.head(10).to_dict(orient='records')

        # JSON-compatible dictionary
        result = {
            "top_rows": top_rows
        }

        # Return the result as JSON response with proper Content-Type
        return JSONResponse(content=result)

    except Exception as e:
        error_info = {
            "error": str(e),
            "message": "An error occurred while fetching the data."
        }
        return JSONResponse(content=error_info, status_code=500)

import processing
from models.model import PlotRequest
from fastapi.responses import JSONResponse


async def analytics() -> JSONResponse:
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


async def plot_data(plot_request: PlotRequest) -> JSONResponse:
    try:
        # fetching cleaner data with additional statistics
        result, data_no_outliers = await processing.processing()

        # Filter the DataFrame based on the requested columns
        filtered_data = data_no_outliers[plot_request.columns]

        # Convert the filtered DataFrame to a list of dictionaries
        filtered_data = filtered_data.to_dict(orient='records')

        # Prepare the result dictionary
        result = {
            "data": filtered_data,
            "plot": plot_request.plot
        }

        # Return the result as JSON response
        return JSONResponse(content=result)

    except Exception as e:
        print('Error occurred:', e)  # Add this line
        error_info = {
            "error": str(e),
            "message": "An error occurred while fetching the data."
        }
        return JSONResponse(content=error_info, status_code=500)

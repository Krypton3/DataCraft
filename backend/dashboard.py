import processing
from fastapi.responses import JSONResponse


async def dashboard():
    try:
        # fetching cleaner data with additional statistics
        result, data_no_outliers = await processing.processing()

        # Correlation matrix for numerical columns
        correlation_matrix = data_no_outliers.select_dtypes(include=[float, int]).corr().map(float).to_dict()
        result["correlation_matrix"] = correlation_matrix

        # Data Distribution
        distribution = {}
        for col in data_no_outliers.select_dtypes(include=['number']).columns:
            distribution[col] = data_no_outliers[col].describe().to_dict()
        result["distribution"] = distribution

        # Top N Rows
        top_rows = data_no_outliers.head(5).to_dict(orient='records')
        result["top_rows"] = top_rows

        # Final information after cleaning
        final_info = {
            "final_shape": tuple(map(int, data_no_outliers.shape)),
            "cleaned_missing_values": data_no_outliers.isnull().sum().to_dict(),
            "cleaned_duplicate_rows": int(data_no_outliers.duplicated().sum())
        }
        result["final_info"] = final_info

        # Return the result as JSON response with proper Content-Type
        return JSONResponse(content=result)

    except Exception as e:
        error_info = {
            "error": str(e),
            "message": "An error occurred during the analysis and cleaning process."
        }
        return JSONResponse(content=error_info, status_code=500)

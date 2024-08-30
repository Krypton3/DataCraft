import pandas as pd
from fastapi.responses import JSONResponse


async def processing(data: pd.DataFrame):
    try:
        # Initial analysis
        init_info = {
            "initial_shape": tuple(map(int, data.shape)),
            "columns": list(data.columns),
            "missing_values": data.isnull().sum().to_dict(),
            "duplicate_rows": int(data.duplicated().sum()),
            "data_types": data.dtypes.apply(lambda x: x.name).to_dict()
        }

        # Removing duplicates
        data = data.drop_duplicates()

        # Handling missing values
        data_cleaned = data.dropna()

        # Summary Statistics
        summary_statistics = data_cleaned.describe().to_dict()

        # Value Counts for Categorical Columns
        value_counts = {}
        for col in data_cleaned.select_dtypes(include=['object', 'category']).columns:
            value_counts[col] = data_cleaned[col].value_counts().to_dict()

        # Detecting outliers using IQR method
        def detect_outliers(df):
            outliers_columns = []
            for column in df.select_dtypes(include=[float, int]).columns:
                Q1 = df[column].quantile(0.25)
                Q3 = df[column].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                if df[(df[column] < lower_bound) | (df[column] > upper_bound)].shape[0] > 0:
                    outliers_columns.append(column)
            return outliers_columns

        outliers_columns = detect_outliers(data_cleaned)

        # Removing outliers
        def remove_outliers(df):
            for column in df.select_dtypes(include=[float, int]).columns:
                Q1 = df[column].quantile(0.25)
                Q3 = df[column].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                df = df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]
            return df

        data_no_outliers = remove_outliers(data_cleaned)

        # Correlation matrix for numerical columns
        correlation_matrix = data_no_outliers.select_dtypes(include=[float, int]).corr().map(float).to_dict()

        # Data Distribution
        distribution = {}
        for col in data_no_outliers.select_dtypes(include=['number']).columns:
            distribution[col] = data_no_outliers[col].describe().to_dict()

        # Top N Rows
        top_rows = data_no_outliers.head(5).to_dict(orient='records')

        # Final information after cleaning
        final_info = {
            "final_shape": tuple(map(int, data_no_outliers.shape)),
            "cleaned_missing_values": data_no_outliers.isnull().sum().to_dict(),
            "cleaned_duplicate_rows": int(data_no_outliers.duplicated().sum())
        }

        # Compiling all results into a JSON-compatible dictionary
        result = {
            "initial_info": init_info,
            "summary_statistics": summary_statistics,
            "value_counts": value_counts,
            "outliers_columns": outliers_columns,
            "final_info": final_info,
            "correlation_matrix": correlation_matrix,
            "distribution": distribution,
            "top_rows": top_rows
        }

        # Return the result as JSON response with proper Content-Type
        return JSONResponse(content=result)

    except Exception as e:
        error_info = {
            "error": str(e),
            "message": "An error occurred during the analysis and cleaning process."
        }
        return JSONResponse(content=error_info, status_code=500)

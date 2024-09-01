import pandas as pd
from fastapi.responses import JSONResponse


async def processing():
    try:
        file_path = './data/cost_of_living_2024.csv'
        data = pd.read_csv(file_path)
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
        # primary statistics
        result = {
            "initial_info": init_info,
            "summary_statistics": summary_statistics,
            "value_counts": value_counts,
            "outliers_columns": outliers_columns
        }

        # Return primary result and cleaner data
        return result, data_no_outliers

    except Exception as e:
        error_info = {
            "error": str(e),
            "message": "An error occurred during the analysis and cleaning process."
        }
        return JSONResponse(content=error_info, status_code=500)

# DataCraft

# Dashboard and Analytics

This open-source project allows you to upload a CSV file and automatically generate a comprehensive dashboard with various visualizations and plots. It leverages powerful data visualization libraries to provide insights and analytics from your data.

## Features

- **CSV File Upload**: Users can upload CSV files directly through the web interface.
- **Automatic Dashboard Creation**: Upon uploading a CSV file, the application generates a dashboard with various visualizations.
- **Interactive Visualizations**: The dashboard includes a range of plots and charts that are interactive, allowing users to explore the data in depth.
- **Analytics and Insights**: The application provides key analytics based on the uploaded data, offering insights into trends, distributions, and correlations.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:



2. **Install dependencies**:

   Ensure you have Python installed. Then, set up a virtual environment and install the required packages:

   ```bash
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**:

   Run the FastAPI backend to handle CSV uploads and data processing:


4. **Run the frontend**:

   Ensure you have Node.js installed. Then, navigate to the frontend directory and start the development server:



5. **Open the application**:

   Visit `http://localhost:3000` in your web browser to access the application.

## Usage

1. **Upload a CSV File**:
   - Use the "Input File" button to select and upload a CSV file from your local system.

2. **View the Dashboard**:
   - Once uploaded, the application will process the CSV file and automatically generate a dashboard with various plots and visualizations.

3. **Explore the Data**:
   - Interact with the visualizations to explore the data. Hover over charts to see detailed information, filter data, and adjust visualization settings as needed.

## Visualization Types

The dashboard may include the following types of visualizations, depending on the data:

- **Bar Charts**: For categorical data comparison.
- **Line Plots**: To show trends over time.
- **Scatter Plots**: To visualize correlations between variables.
- **Histograms**: For understanding the distribution of a single variable.
- **Pie Charts**: To represent parts of a whole.
- **Heatmaps**: To visualize relationships between variables using color intensity.

## Contributions

Contributions are welcome! If you have ideas for new features, find a bug, or want to improve the documentation, please submit an issue or a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project utilizes the following technologies:

- **FastAPI**: For the backend API and data processing.
- **NextJS**: For the frontend interface.
- **NextUI**: For the user interface components.
- **Plotly.js**: For creating interactive data visualizations.
- **Pandas**: For data manipulation and analysis.

## Contact

For any inquiries or issues, please contact [mahedihasanjisan@gmail.com].

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def process_data():
    file_path = 'college.csv'
    df = pd.read_csv(file_path)

    required_columns = ['College Name', 'Courses', '2022', '2023', '2024','2025']
    if not all(col in df.columns for col in required_columns):
        raise ValueError("The Excel file does not have the required columns.")
    
    data = []
    for _, row in df.iterrows():
        data.append({
            'college_name': row['College Name'],
            'course': row['Courses'],
            'cutoff_2022': row['2022'] if not pd.isna(row['2022']) else None,
            'cutoff_2023': row['2023'] if not pd.isna(row['2023']) else None,
            'cutoff_2024': row['2024'] if not pd.isna(row['2024']) else None,
            'cutoff_2025': row['2025'] if not pd.isna(row['2025']) else None,
        })

    return data

@app.route('/api/colleges', methods=['POST'])
def get_colleges():
    try:
        data = request.json
        user_rank = int(data.get('rank'))
        selected_course = data.get('course')

        colleges_data = process_data()

        filtered_colleges = []
        for college in colleges_data:
            if college['course'] == selected_course and \
               college['cutoff_2025'] is not None and \
               college['cutoff_2025'] >= user_rank:
                filtered_colleges.append({
                    'name': college['college_name'],
                    'cutoffs': {
                        '2022': college['cutoff_2022'],
                        '2023': college['cutoff_2023'],
                        '2024': college['cutoff_2024'],
                        '2025': college['cutoff_2025'],
                    }
                })

        return jsonify(filtered_colleges)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

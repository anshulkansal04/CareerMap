from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def read_cutoff_data():
    """Read and process cutoff data from college_cutoff.csv"""
    cutoff_df = pd.read_csv('college.csv')
    required_columns = ['College Name', 'Courses', '2022', '2023', '2024', '2025']
    if not all(col in cutoff_df.columns for col in required_columns):
        raise ValueError("The cutoff file does not have the required columns.")
    return cutoff_df

def read_college_details():
    """Read and process college details from filtered.csv"""
    details_df = pd.read_csv('filtered.csv')
    required_columns = [
        'College Name', 'Campus Size', 'Total Student Enrollments', 
        'Total Faculty', 'Established Year', 'Facilities', 
        'College Type', 'Average Fees'
    ]
    if not all(col in details_df.columns for col in required_columns):
        raise ValueError("The details file does not have the required columns.")
    return details_df

def process_data():
    cutoff_df = read_cutoff_data()
    details_df = read_college_details()
    
    details_dict = details_df.set_index('College Name').to_dict('index')
    
    data = []
    for _, row in cutoff_df.iterrows():
        college_name = row['College Name']
        college_details = details_dict.get(college_name, {})
        
        college_entry = {
            'college_name': college_name,
            'course': row['Courses'],
            'cutoff_2022': row['2022'] if not pd.isna(row['2022']) else None,
            'cutoff_2023': row['2023'] if not pd.isna(row['2023']) else None,
            'cutoff_2024': row['2024'] if not pd.isna(row['2024']) else None,
            'cutoff_2025': row['2025'] if not pd.isna(row['2025']) else None,
            'details': {
                'campus_size': college_details.get('Campus Size', 'N/A'),
                'total_students': college_details.get('Total Student Enrollments', 'N/A'),
                'total_faculty': college_details.get('Total Faculty', 'N/A'),
                'established_year': college_details.get('Established Year', 'N/A'),
                'facilities': college_details.get('Facilities', '').split(', ') if college_details.get('Facilities') else [],
                'college_type': college_details.get('College Type', 'N/A'),
                'average_fees': college_details.get('Average Fees', 'N/A')
            }
        }
        data.append(college_entry)

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
                    },
                    'details': college['details']
                })
        
        filtered_colleges.sort(key=lambda x: x['cutoffs']['2025'])

        return jsonify(filtered_colleges)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=4000)
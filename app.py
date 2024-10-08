from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Configuration for the MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/assetflow_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the entries table as a model
class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_type = db.Column(db.Enum('expense', 'asset', name='entry_type_enum'), nullable=False)
    entry_name = db.Column(db.String(255), nullable=False)
    entry_amount = db.Column(db.Numeric(10, 2), nullable=False)
    entry_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, entry_type, entry_name, entry_amount):
        self.entry_type = entry_type
        self.entry_name = entry_name
        self.entry_amount = entry_amount

# Route for rendering the main page
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding a new entry (expense or asset)
@app.route('/add-entry', methods=['POST'])
def add_entry():
    data = request.get_json()
    entry_type = data.get('entry_type')
    entry_name = data.get('entry_name')
    entry_amount = data.get('entry_amount')

    if entry_type and entry_name and entry_amount:
        # Create a new Entry object and add it to the database
        new_entry = Entry(entry_type=entry_type, entry_name=entry_name, entry_amount=entry_amount)
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'Entry added successfully!'}), 201
    else:
        return jsonify({'error': 'Invalid data'}), 400

# Route for retrieving all entries
@app.route('/get-entries', methods=['GET'])
def get_entries():
    entries = Entry.query.order_by(Entry.entry_date.desc()).all()
    result = [
        {
            'type': entry.entry_type,
            'name': entry.entry_name,
            'amount': str(entry.entry_amount),
            'date': entry.entry_date.strftime('%Y-%m-%d')
        }
        for entry in entries
    ]
    return jsonify(result)

# Route for calculating total expenses and total assets
@app.route('/get-totals', methods=['GET'])
def get_totals():
    total_expenses = db.session.query(db.func.sum(Entry.entry_amount)).filter(Entry.entry_type == 'expense').scalar() or 0
    total_assets = db.session.query(db.func.sum(Entry.entry_amount)).filter(Entry.entry_type == 'asset').scalar() or 0
    return jsonify({
        'total_expenses': str(total_expenses),
        'total_assets': str(total_assets)
    })

if __name__ == '__main__':
    app.run(debug=True)

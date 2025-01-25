import sys
sys.dont_write_bytecode = True
from model import response
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/api/plagent', methods=['GET', 'POST'])
def plagent():
   
   plant_name = request.json.get('plant_name')
   plant_disease = request.json.get('plant_disease')

   workflow = response()
   initial_state = {
       "plant_name": plant_name,
       "plant_disease": plant_disease,
       "loading_state": "Identification Process",
       "content": [],
       "result": "",
   }

   # Run the workflow using stream and get the final state
   final_state = None
   for state in workflow.graph.stream(initial_state):
       final_state = state
   print(final_state['generate']['result'])
   return final_state(['generate']['result'])

if __name__ == "__main__":
   app.run(debug=True, port=8080)
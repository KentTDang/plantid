import sys
sys.dont_write_bytecode = True
from model import response

def main():
   workflow = response()
   initial_state = {
       "plant_name": "Rose",
       "plant_disease": "Powdery Mildew",
       "loading_state": "Identification Process",
       "content": [],
       "result": "",
   }

   # Run the workflow using stream and get the final state
   final_state = None
   for state in workflow.graph.stream(initial_state):
       final_state = state
   print(final_state['generate']['result'])

if __name__ == "__main__":
   main()
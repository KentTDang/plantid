from setup import client
from langgraph.graph import StateGraph
from typing import TypedDict, List
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI

# Represents the state of an agent in the system
class AgentState(TypedDict):
   plant_name: str # User Input
   plant_disease: str # User Input
   loading_state: str # Keep track of loading state
   content: List[str] # Aggregate content for final response
   result: str # Overall Result

class response():
   def __init__(self):

       # Agent LLM Model
       self.model = ChatOpenAI(model = "gpt-4o-mini", temperature=0)

       # Agent Node Prompts
       self.IDENTIFICATION_PROPMT = ("""
                                   You are a knowledgeable horticulturist with expertise in plant diseases. The user has provided the following information:


                                   - Plant Name: {plant_name}
                                   - Plant Disease: {disease_name}


                                   1. Provide a brief summary or overview of how this dease typically affects the specified plant, including common causes and likely progression.
                                   2. Provide a brief summary or list of clear indicators shown on plants for this disease
                                    
                                   """)
      
       self.TREATMENT_PROMPT = ("""
                                   You are a knowledgeable horticulturist with expertise in plant diseases. The user has provided the following information:


                                   - Plant Name: {plant_name}
                                   - Plant Disease: {disease_name}


                                   1. Given the nature of this disease, provide step-by-step treatments or interventions, including both chemical and non-chemical approaches. 
                                   2. Recommend any necessary environmental or cultural adjustments (e.g., watering schedule, pruning methods, soil amendments). 
                               
                                   """)
      
       self.GENERATE_RESPONSE_PROMPT = ("""
                                   You are a knowledgeable horticulturist with expertise in plant diseases. The user has provided the following information:
                                       
                                   - Plant Name: {plant_name}
                                   - Plant Disease: {disease_name}
                                       
                                   Your colleges have provided you with the identification and treatment process. Your job is to validate the results and suggest ongoing preventative measures to minimize the risk of recurrence or spread of this disease in similar plants. If the identification and treatments are correct, do NOT make any changes to them and output the identification and treatment along with your steps for future prevention
                           """)
      
       # Construct Agent Node
       builder = StateGraph(AgentState)
       builder.add_node("identification", self.identification_node)
       builder.add_node("treatment", self.treatment_node)
       builder.add_node("generate", self.generation_node)

       # Agent Graph Entry Point
       builder.set_entry_point("identification")

       # Agent Graph Exit Point
       builder.set_finish_point("generate")

       # Construct Agent State Graph (linkage)
       builder.add_edge("identification", "treatment")
       builder.add_edge("treatment", "generate")

       self.graph = builder.compile()

   # Identification Agent
   def identification_node(self, state: AgentState):
       print(state["loading_state"])
       prompt = self.IDENTIFICATION_PROPMT.format(
           plant_name=state["plant_name"],
           disease_name=state["plant_disease"]
       )
       messages = [
           SystemMessage(content = prompt),
       ]
       response = self.model.invoke(messages)

       state["loading_state"] = 'Treatment Planning'
       state["content"].append(response.content)
       return state

   # Treatment Agent
   def treatment_node(self, state: AgentState):
       print(state["loading_state"])
       prompt = self.TREATMENT_PROMPT.format(
           plant_name=state["plant_name"],
           disease_name=state["plant_disease"]
       )
       messages = [
           SystemMessage(content = prompt),
       ]
       response = self.model.invoke(messages)

       state["loading_state"] = 'Generating Prevention Plan'
       state["content"].append(response.content)
       return state
  
   # Generation Agent
   def generation_node(self, state: AgentState):

       print(state["loading_state"])
       combined_content = "\n\n".join(state["content"])


       messages = [
           SystemMessage(content = self.GENERATE_RESPONSE_PROMPT),
           HumanMessage(content = combined_content)
       ]
       response = self.model.invoke(messages)


       state["result"] = response.content
       return state
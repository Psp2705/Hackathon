import google.generativeai as genai
from dotenv import load_dotenv
import os 

load_dotenv()

api_key=os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-flash")

def ask_question(question: str, language="english", mode="simple"):
    explain_style = "Explain like I'm 15 years old." if "Simple" in mode else "Explain with details and example."
    prompt = f"""
You are an expert insurance advisor.

{explain_style}

Explain the following question in simple terms for a beginner:

'{question}'

Then translate the explanation to {language.title()}.

Return the response in the following format:

English: <your explanation in English>
{language.title()}: <your translated version>
"""
    response = model.generate_content(prompt)
    return response.text

def explain_policy(policy, user_input):
    prompt = f"""
You are a financial advisor.

Explain why this policy is suitable for someone aged {user_input['age']}, earning {user_input['income']}, interested in {user_input['needs']} with rider needs {user_input['riders']}.

Policy Details:
Name: {policy['name']}
Type: {policy['type']}
Features: {', '.join(policy['features'])}
Riders: {', '.join(policy['riders'])}
"""
    result = model.generate_content(prompt)
    return result.text

def get_insurance_type_recommendation(age, income, dependents, goals):
    goals_text = ", ".join(goals) if isinstance(goals, list) else goals
    prompt = f"""
    You are an expert insurance advisor.

    Based on the following user profile:

    - Age: {age}
    - Income: {income}
    - Has Dependents: {dependents}
    - Financial Goals: {goals_text}

    Recommend the most suitable types of insurance (e.g., term, health, ULIP, life) and briefly explain why, in simple language.
    """

    response = model.generate_content(prompt)
    return response.text

def simulate_insurance_scenario(age, insurance, scenario):
    prompt = f"""
    A user is {age} years old and holds the following insurance: {insurance}.
    Simulate the impact of this scenario: {scenario}.

    Explain what protections, benefits, or gaps this insurance would provide during such an event.
    Keep the explanation clear and simple.
    """

    result = model.generate_content(prompt)
    return result.text
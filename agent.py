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

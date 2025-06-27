import google.generativeai as genai
import os 

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def ask_question(question: str, language="english"):
    prompt = f"""
You are an expert insurance advisor.

Explain the following question in simple terms for a beginner:

'{question}'

Then translate the explanation to {language}.

Return the response in the following format:

English: <your explanation in English>
{language.title()}: <your translated version>
"""
    response = model.generate_content(prompt)
    return response.text
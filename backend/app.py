from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import ask_question, explain_policy, get_insurance_type_recommendation, simulate_insurance_scenario
from policy_compare import recommend_policies
import os

app = Flask(__name__)
CORS(app)

@app.route("/ask-question", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question")
    language = data.get("language", "english")
    mode = data.get("mode", "Simple")
    answer = ask_question(question, language, mode)
    return jsonify({"answer": answer})

@app.route("/compare-policies", methods=["POST"])
def compare():
    data = request.json
    policies = recommend_policies(data)
    return jsonify(policies)

@app.route("/explain-policy", methods=["POST"])
def explain():
    data = request.json
    policy = data["policy"]
    user_input = data["user_input"]
    explanation = explain_policy(policy, user_input)
    return jsonify({"explanation": explanation})


@app.route("/recommend-insurance-type", methods=["POST"])
def recommend_type():
    data = request.get_json()
    age = data.get("age")
    income = data.get("income")
    dependents = data.get("dependents")
    goals = data.get("goals")

    try:
        result = get_insurance_type_recommendation(age, income, dependents, goals)
        return jsonify({"recommendation": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/simulate-scenario", methods=["POST"])
def simulate_scenario():
    data = request.get_json()
    age = data.get("age")
    insurance = data.get("insurance")
    scenario = data.get("scenario")

    try:
        result = simulate_insurance_scenario(age, insurance, scenario)
        return jsonify({"answer": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  
    app.run(host="0.0.0.0", port=port)




# import streamlit as st
# from agent import ask_question
# from policy_compare import recommend_policies
# from agent import explain_policy
# import textwrap
# import pandas as pd


# st.set_page_config(page_title="InsureGuide", layout="centered")
# st.title("My Insurance Literacy Coach")

# tabs = st.tabs(["Insurance Q&A (Multilingual)", "Policy Comparison Tool"])

# # tab1
# with tabs[0]:
#     st.subheader("Ask an Insurance Question")
#     st.markdown("Ask me any question about insurance. I'll do my best to answer it in simple words.")

#     user_question = st.text_area("Enter your insurance-related question:")
#     language = st.selectbox("Choose translation language", ["Hindi","Marathi","None"])
#     explain_mode = st.radio("Explain Style", ["Simple (like I'm 15)", "Detailed"])

#     # Government schemes
#     is_govt_query = any(x in user_question.lower() for x in ["government schemes", "pmjjby", "ayushman", "pradhan mantri", "insurance scheme"])

#     if st.button("Get Answer", key="coach"):
#         if not user_question.strip():
#             st.warning("Please enter a question.")
#         else:
#             lang = "english" if language == "None" else language.lower()
#             with st.spinner("Processing..."):
#                 if is_govt_query:
#                     gov_response =  """
#         **🟢 Major Government Insurance Schemes in India:**

#         - **PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana):**
#         - ₹2 lakh life cover for ₹330/year.
#         - **PMSBY (Suraksha Bima):**
#         - ₹2 lakh accident cover for ₹12/year.
#         - **Ayushman Bharat (PM-JAY):**
#         - ₹5 lakh health cover for poor families.
#         """
#                     st.markdown(gov_response)
#                 else:
#                     result = ask_question(user_question, lang)
#                     st.markdown(result)



# # tab2
# with tabs[1]:
#     st.subheader("Policy Comaprison Tool")
#     st.markdown("Tell me what kind of insurance you’re looking for. I’ll recommend the best plans.")

#     age = st.slider("Your Age", 18, 65, 30)
#     income = st.selectbox("Monthly Income", ["< ₹20k", "₹20k–50k", "₹50k–1L", "> ₹1L"])
#     policy_type = st.selectbox("Preferred Insurance Type", ["Any", "Term", "ULIP", "Health"])
#     needs = st.multiselect("Your Needs", ["Low premium", "Tax benefit", "High return", "Health cover", "Family cover"])
#     riders = st.multiselect("Optional Riders", ["Accident Cover", "Maternity", "Critical Illness", "Cancer Cover"])

#     if st.button("Compare Policies", key="compare"):
#         user_input = {
#             "age": age,
#             "income": income,
#             "type": policy_type.lower(),
#             "needs": [n.lower() for n in needs],
#             "riders": [r.lower() for r in riders]
#         }

#         results = recommend_policies(user_input)

#         if results:
#             st.success(f"Found {len(results)} policy match(es):")

#             import pandas as pd

#             top_policies = results[:3]

#             df = pd.DataFrame([
#                 {
#                     "Policy": p["name"],
#                     "Type": p["type"].title(),
#                     "Coverage (₹)": p["coverage"],
#                     "Premium (₹/mo)": p["premium"],
#                     "Trust Score (%)": p.get("trust_score", 0),
#                     "Score (%)": p.get("score", 0)
#                 }
#                 for p in top_policies
#             ])

#             st.subheader("📊 Visual Comparison Table")
#             st.dataframe(df, use_container_width=True)

#             # (Optional) Progress bars
#             for p in top_policies:
#                 st.markdown(f"**🔐 {p['name']} - Trust Level:** {p.get('trust_score', 0)}%")
#                 st.progress(p.get('trust_score', 0))

#                 st.markdown(f"**🔎 Suitability Score:** {p.get('score', 0)}%")
#                 st.progress(p.get('score', 0))

# #             for policy in results:
# #                 st.markdown(f"""---  
# # ### 🛡️ {policy['name']}  
# # - **Type:** {policy['type'].title()}  
# # - **Coverage:** ₹{policy['coverage']}  
# # - **Premium:** ₹{policy['premium']} / month  
# # - **Features:** {', '.join(policy['features'])}  
# # - **Riders Available:** {', '.join(policy['riders'])}  
# # - **Suitability Score:** `{policy['score']}
# # - **Trust Level:** {policy.get('trust_score', 'N/A')}%`  
# # """)
# #                 if 'trust_score' in policy:
# #                     st.progress(policy['trust_score'])
# #                 st.progress(policy.get('score', 0))
# #                 if st.button(f"Why this policy? ({policy['name']})", key=policy['name']):
# #                     explanation = explain_policy(policy, user_input)
# #                     st.info(explanation)
# #         else:
# #             st.warning("No suitable policy found. Try changing your preferences.")



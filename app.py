import streamlit as st
from agent import ask_question
from policy_compare import recommend_policies

st.set_page_config(page_title="InsureGuide", layout="centered")
st.title("My Insurance Literacy Coach")

tabs = st.tabs(["Insurance Q&A (Multilingual)", "Policy Comparison Tool"])

# tab1
with tabs[0]:
    st.subheader("Ask an Insurance Question")
    st.markdown("Ask me any question about insurance. I'll do my best to answer it in simple words.")

    user_question = st.text_area("Enter your insurance-related question:")
    language = st.selectbox("Choose translation language", ["Hindi","Marathi","None"])

    if st.button("Get Answer"):
        if not user_question.strip():
            st.warning("Please enter a question.")
        else:
            lang = "english" if language == "None" else language.lower()
            with st.spinner("Processing..."):
                result = ask_question(user_question, lang)
            st.markdown(result)



# tab2
with tabs[1]:
    st.subheader("Policy Comaprison Tool")
    st.markdown("Tell me what kind of insurance you’re looking for. I’ll recommend the best plans.")

    user_needs = st.text_area("Descibe your insurance needs(e.g., low premium, investment, tax benefit): ")

    if st.button("Compare policies", key="compare_btn"):
        if not user_needs.strip():
            st.warning("Please enter your needs.")
        else:
            with st.spinner("Finding the best matches...."):
                matches = recommend_policies(user_needs)
            if matches:
                st.success(f"Found {len(matches)} policy match(es):")
                for policy in matches:
                    st.markdown(f"""
                    ---
                    **🛡️ {policy['name']}**
                    - Type: {policy['type'].title()}
                    - Coverage: ₹{policy['coverage']}
                    - Premium: ₹{policy['premium']} / month
                    - Features: {", ".join(policy['features'])}
                    """)
                else:
                    st.warning("No suitable policy found. Try different keywords.")

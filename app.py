import streamlit as st
from agent import ask_question

st.set_page_config(page_title="InsureGuide", layout="centered")
st.title("My Insurance Literacy Coach")


st.markdown("Ask any question about insurance and I will explain it in simple words.")

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
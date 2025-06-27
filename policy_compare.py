import json

def load_policies():
    with open("policy_data.json") as f:
        return json.load(f)

def recommend_policies(user_input: str):
    data = load_policies()
    keywords = user_input.lower()

    def match(policy):
        for feature in policy["features"]:
            if feature in keywords:
                return True
        return False

    return [p for p in data if match(p)]
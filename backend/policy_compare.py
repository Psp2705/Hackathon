import json

def load_policies():
    with open("policy_data.json") as f:
        return json.load(f)

def recommend_policies(user_input: str):
    data = load_policies()
    results = []

    for policy in data:
        score = 0

        # Type match
        if user_input["type"] != "any" and policy["type"] != user_input["type"]:
            continue
        else:
            score += 15

        # Needs match
        for need in user_input["needs"]:
            if need in policy["features"]:
                score += 10

        # Riders match
        for rider in user_input["riders"]:
            if rider in policy["riders"]:
                score += 5

        # Age-based bonus (example)
        if policy["type"] == "term" and 25 <= user_input["age"] <= 40:
            score += 5

        policy["score"] = min(score, 100)
        results.append(policy)

    # Sort policies by score descending
    return sorted(results, key=lambda x: x["score"], reverse=True)


    # keywords = user_input.lower()

    # def match(policy):
    #     for feature in policy["features"]:
    #         if feature in keywords:
    #             return True
    #     return False

    # return [p for p in data if match(p)]
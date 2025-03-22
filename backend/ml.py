import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Define dataset as Python data
crop_data = [
    {"soilType": "loamy", "pH": 6.5, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Wheat", "Maize", "Barley"]},
    {"soilType": "sandy", "pH": 6.0, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Rice", "Sorghum"]},
    {"soilType": "clayey", "pH": 7.0, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Soybean", "Cotton", "Peas"]},
    {"soilType": "loamy", "pH": 6.2, "rainfall": "moderate", "temperature": "warm", "season": "dry", "crop_labels": ["Barley", "Oats", "Rye"]},
    {"soilType": "sandy", "pH": 5.8, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Sorghum", "Millet"]},
    {"soilType": "clayey", "pH": 6.8, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Millet", "Rice", "Lentils"]},
    {"soilType": "loamy", "pH": 6.5, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Potato", "Tomato", "Carrot"]},
    {"soilType": "sandy", "pH": 6.1, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Cucumber", "Lettuce", "Pepper"]},
    {"soilType": "clayey", "pH": 7.2, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Spinach", "Kale"]},
    {"soilType": "loamy", "pH": 6.3, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Carrot", "Onion", "Garlic"]},
    {"soilType": "sandy", "pH": 5.9, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Garlic", "Radish", "Zucchini"]},
    {"soilType": "clayey", "pH": 6.7, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Pepper", "Eggplant", "Cauliflower"]},
    {"soilType": "loamy", "pH": 6.4, "rainfall": "moderate", "temperature": "warm", "season": "dry", "crop_labels": ["Pumpkin", "Squash"]},
    {"soilType": "sandy", "pH": 6.0, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Watermelon", "Cantaloupe", "Melon"]},
    {"soilType": "clayey", "pH": 7.1, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Apple", "Orange", "Peach"]},
    {"soilType": "loamy", "pH": 6.6, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Lemon", "Peach", "Plum"]},
    {"soilType": "sandy", "pH": 6.0, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Pear", "Mango", "Lychee"]},
    {"soilType": "clayey", "pH": 7.0, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Papaya", "Banana", "Avocado"]},
    {"soilType": "loamy", "pH": 6.3, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Grapes", "Coffee", "Tea"]},
    {"soilType": "sandy", "pH": 6.2, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Tea", "Cocoa", "Cassava"]},
    {"soilType": "clayey", "pH": 6.9, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Sugarcane", "Sugar beet", "Flax"]},
    {"soilType": "loamy", "pH": 6.4, "rainfall": "moderate", "temperature": "warm", "season": "dry", "crop_labels": ["Sunflower", "Canola", "Mustard"]},
    {"soilType": "sandy", "pH": 5.7, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Peanut", "Lentils", "Chickpea"]},
    {"soilType": "clayey", "pH": 6.8, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Chickpea", "Broccoli", "Cabbage"]},
    {"soilType": "loamy", "pH": 6.5, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Cauliflower", "Cabbage", "Lettuce"]},
    {"soilType": "sandy", "pH": 5.9, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Spinach", "Zucchini", "Okra"]},
    {"soilType": "clayey", "pH": 7.2, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Squash", "Eggplant", "Beet"]},
    {"soilType": "loamy", "pH": 6.1, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Cucumber", "Radish", "Kale"]},
    {"soilType": "sandy", "pH": 6.0, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Beet", "Onion", "Bell Pepper"]},
    {"soilType": "clayey", "pH": 6.7, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Garlic", "Tomato", "Strawberry"]},
    {"soilType": "loamy", "pH": 6.5, "rainfall": "moderate", "temperature": "warm", "season": "rainy", "crop_labels": ["Alfalfa", "Rye", "Amaranth"]},
    {"soilType": "sandy", "pH": 6.3, "rainfall": "low", "temperature": "hot", "season": "dry", "crop_labels": ["Peas", "Jute", "Mulberry"]},
    {"soilType": "clayey", "pH": 7.1, "rainfall": "high", "temperature": "cool", "season": "rainy", "crop_labels": ["Blueberry", "Cranberry", "Raspberry"]}
]


df = pd.DataFrame(crop_data)

# Explode the crop_labels into multiple rows
df = df.explode('crop_labels')

# Define features and target
X = df[['soilType', 'pH', 'rainfall', 'temperature', 'season']]
y = df['crop_labels']

# Preprocessing for categorical and numerical data
categorical_features = ['soilType', 'rainfall', 'temperature', 'season']
numerical_features = ['pH']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(), categorical_features)
    ])

# Create a pipeline with a RandomForestClassifier
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

def predict_crops(input_data):
    # Predict the probabilities for each crop
    probabilities = model.predict_proba(input_data)
    classes = model.named_steps['classifier'].classes_

    # Create a list of dictionaries with crop names and their scores
    predictions = []
    for i, crop in enumerate(classes):
        predictions.append({
            'name': crop,
            'score': int(probabilities[0][i] * 100),  # Convert to percentage
            'estimatedYield': '1.5-2 tons/hectare',  # Placeholder, replace with actual data
            'growingPeriod': '2-3 months',  # Placeholder, replace with actual data
            'waterRequirement': 'Low to Moderate',  # Placeholder, replace with actual data
            'profitPotential': 'Medium'  # Placeholder, replace with actual data
        })

    # Sort the predictions by score in descending order
    predictions.sort(key=lambda x: x['score'], reverse=True)

    return predictions
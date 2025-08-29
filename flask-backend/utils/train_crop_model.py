import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# ---------------------------
# Step 1: Locate CSV file
# ---------------------------
script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, "Crop_recommendation.csv")   # ✅ FIXED

# Load dataset
data = pd.read_csv(csv_path)   # ✅ use csv_path instead of hardcoded name
print("Dataset loaded successfully. First 5 rows:")
print(data.head())

# ---------------------------
# Step 2: Split features and target
# ---------------------------
X = data.drop("crop", axis=1)
y = data["crop"]

# ---------------------------
# Step 3: Train/Test split
# ---------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Training samples: {X_train.shape[0]}, Testing samples: {X_test.shape[0]}")

# ---------------------------
# Step 4: Train AdaBoost model
# ---------------------------
base_estimator = DecisionTreeClassifier(max_depth=3)

# Note: 'base_estimator' is deprecated in sklearn 1.7+, use 'estimator'
model = AdaBoostClassifier(estimator=base_estimator, n_estimators=50, random_state=42)
model.fit(X_train, y_train)
print("Model trained successfully.")

# ---------------------------
# Step 5: Evaluate model
# ---------------------------
y_pred = model.predict(X_test)
print("\n--- Model Evaluation ---")
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# ---------------------------
# Step 6: Save trained model
# ---------------------------
model_path = os.path.join(script_dir, "crop.pkl")
joblib.dump(model, model_path)
print(f"Model saved successfully at: {model_path}")

# ---------------------------
# Step 7: Example prediction
# ---------------------------
sample_input = [[90, 42, 43, 20.5, 80, 6.5, 200]]  # N, P, K, temp, humidity, ph, rainfall
predicted_crop = model.predict(sample_input)
print("\nExample prediction for sample input:", predicted_crop[0])

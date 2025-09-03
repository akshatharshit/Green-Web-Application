# from flask import Flask, request, jsonify
# from markupsafe import Markup
# from flask_cors import CORS
# import numpy as np
# import pandas as pd
# import io
# import os
# import torch
# from torchvision import transforms
# from PIL import Image
# import joblib

# from utils.disease import disease_dic
# from utils.model import ResNet9

# # ------------------ Disease classes ------------------
# disease_classes = [
#     "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust",
#     "Apple___healthy", "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew",
#     "Cherry_(including_sour)___healthy", "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
#     "Corn_(maize)___Common_rust_", "Corn_(maize)___Northern_Leaf_Blight",
#     "Corn_(maize)___healthy", "Grape___Black_rot", "Grape___Esca_(Black_Measles)",
#     "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
#     "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot",
#     "Peach___healthy", "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
#     "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
#     "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
#     "Strawberry___Leaf_scorch", "Strawberry___healthy", "Tomato___Bacterial_spot",
#     "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
#     "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
#     "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
#     "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
# ]

# # ------------------ Disease Prediction ------------------
# def predict_image(img):
#     disease_model_path = 'models/plant_disease_model.pth'
#     disease_model = ResNet9(3, len(disease_classes))
#     disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
#     transform = transforms.Compose([
#         transforms.Resize(256),
#         transforms.ToTensor(),
#     ])
#     image = Image.open(io.BytesIO(img))
#     img_t = transform(image)
#     img_u = torch.unsqueeze(img_t, 0)
#     yb = disease_model(img_u)
#     _, preds = torch.max(yb, dim=1)
#     prediction = disease_classes[preds[0].item()]
#     return prediction

# # ------------------ Fertilizer Models ------------------
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# try:
#     fert_cat_model = joblib.load(os.path.join(BASE_DIR, "models/categorical_model.joblib"))
#     fert_num_model = joblib.load(os.path.join(BASE_DIR, "models/numerical_model.joblib"))
#     preprocessor = joblib.load(os.path.join(BASE_DIR, "models/preprocessor.joblib"))
# except Exception as e:
#     print("⚠️ Fertilizer models not loaded:", str(e))
#     fert_cat_model, fert_num_model, preprocessor = None, None, None

# fertilizer_mapping = {
#     0: "Urea (Nitrogen-rich)",
#     1: "Diammonium Phosphate (DAP)",
#     2: "Muriate of Potash (MOP)",
#     3: "Single Super Phosphate (SSP)",
#     4: "Ammonium Sulphate",
#     5: "Compost / Organic Manure",
#     6: "Calcium Ammonium Nitrate (CAN)",
#     7: "Green Manure",
#     8: "Bio-fertilizer",
#     9: "Liquid Urea",
#     10: "Granular Urea",
#     11: "Coated Urea (Slow Release)"
# }

# # ------------------ Flask App ------------------
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

# @app.route('/check-get', methods=['GET'])
# def check():
#     return jsonify({"message": "hello world"})

# @app.route('/check-post', methods=['POST'])
# def check_post():
#     Name = request.json.get('name', None)
#     return jsonify({"name": Name})

# # ------------------ Disease Prediction ------------------
# @app.route('/disease-predict', methods=['POST'])
# def disease_prediction():
#     file = request.files['file']
#     try:
#         img = file.read()
#         prediction = predict_image(img)
#         prediction = disease_dic[prediction]
#         return jsonify(prediction)
#     except Exception as e:
#         print("Error:", str(e))
#         return jsonify({"err": "something went wrong!"})

# # ------------------ Crop Prediction (old pickle model) ------------------
# @app.route('/crop-predict', methods=['POST'])
# def crop_prediction():
#     try:
#         from joblib import load
#         crop_recommendation_model_path = 'models/crop.pkl'
#         crop_recommendation_model = load(crop_recommendation_model_path)

#         N = request.json['nitrogen']
#         P = request.json['phosphorous']
#         K = request.json['pottasium']
#         temperature = request.json['temperature']
#         humidity = request.json['humidity']
#         ph = request.json['ph']
#         rainfall = request.json['rainfall']

#         data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
#         my_prediction = crop_recommendation_model.predict(data)
#         return jsonify({"prediction": my_prediction[0]})

#     except Exception as e:
#         print("❌ Error in /crop-predict:", str(e))
#         return jsonify({"error": "Something went wrong on server."})

# # ------------------ Fertilizer Prediction ------------------
# @app.route('/predict/fertilizer', methods=['POST'])
# def predict_fertilizer():
#     if fert_cat_model is None or fert_num_model is None or preprocessor is None:
#         return jsonify({"error": "Fertilizer models not loaded"})

#     data = request.json
#     df = pd.DataFrame([data])
#     X = preprocessor.transform(df)

#     cat_pred = fert_cat_model.predict(X).ravel()
#     num_pred = fert_num_model.predict(X).ravel()

#     fert_types = [
#         fertilizer_mapping.get(int(code), f"Unknown ({code})")
#         for code in cat_pred
#     ]

#     return jsonify({
#         "fertilizer_types": fert_types,
#         "fertilizer_amount": float(num_pred[0])
#     })

# if __name__ == '__main__':
#     app.run(port=7000, host="0.0.0.0")
























from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import io
import os
import torch
from torchvision import transforms
from PIL import Image
import joblib

from utils.disease import disease_dic
from utils.model import ResNet9

# ------------------ Disease classes ------------------
disease_classes = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust",
    "Apple___healthy", "Blueberry___healthy", "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy", "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_", "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy", "Grape___Black_rot", "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)", "Peach___Bacterial_spot",
    "Peach___healthy", "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch", "Strawberry___healthy", "Tomato___Bacterial_spot",
    "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot", "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

# ------------------ Paths ------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DISEASE_MODEL_FILE = os.path.join(BASE_DIR, "models/plant_disease_model.pth")
CROP_MODEL_FILE = os.path.join(BASE_DIR, "models/crop.pkl")
FERT_CAT_FILE = os.path.join(BASE_DIR, "models/categorical_model.joblib")
FERT_NUM_FILE = os.path.join(BASE_DIR, "models/numerical_model.joblib")
FERT_PREP_FILE = os.path.join(BASE_DIR, "models/preprocessor.joblib")

# ------------------ Disease Model ------------------
disease_model = None
transform = transforms.Compose([transforms.Resize(256), transforms.ToTensor()])

def load_disease_model():
    global disease_model
    if disease_model is None:
        if not os.path.exists(DISEASE_MODEL_FILE):
            raise FileNotFoundError(
                f"❌ Disease model not found at {DISEASE_MODEL_FILE}.\n"
                "Run `git lfs install && git lfs pull` to download the models."
            )
        print("📦 Loading disease model...")
        model = ResNet9(3, len(disease_classes))
        model.load_state_dict(torch.load(DISEASE_MODEL_FILE, map_location=torch.device("cpu")))
        model.eval()
        disease_model = model
    return disease_model

def predict_image(img_bytes):
    model = load_disease_model()
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)
    with torch.no_grad():
        yb = model(img_u)
        _, preds = torch.max(yb, dim=1)
    return disease_classes[preds[0].item()]

# ------------------ Fertilizer Models ------------------
fert_cat_model, fert_num_model, preprocessor = None, None, None
fertilizer_mapping = {
    0: "Urea (Nitrogen-rich)",
    1: "Diammonium Phosphate (DAP)",
    2: "Muriate of Potash (MOP)",
    3: "Single Super Phosphate (SSP)",
    4: "Ammonium Sulphate",
    5: "Compost / Organic Manure",
    6: "Calcium Ammonium Nitrate (CAN)",
    7: "Green Manure",
    8: "Bio-fertilizer",
    9: "Liquid Urea",
    10: "Granular Urea",
    11: "Coated Urea (Slow Release)"
}

def load_fertilizer_models():
    global fert_cat_model, fert_num_model, preprocessor
    if fert_cat_model is None or fert_num_model is None or preprocessor is None:
        for file_path in [FERT_CAT_FILE, FERT_NUM_FILE, FERT_PREP_FILE]:
            if not os.path.exists(file_path):
                raise FileNotFoundError(
                    f"❌ Fertilizer model not found at {file_path}.\n"
                    "Run `git lfs install && git lfs pull` to download the models."
                )
        print("📦 Loading fertilizer models...")
        fert_cat_model = joblib.load(FERT_CAT_FILE)
        fert_num_model = joblib.load(FERT_NUM_FILE)
        preprocessor = joblib.load(FERT_PREP_FILE)
    return fert_cat_model, fert_num_model, preprocessor

# ------------------ Flask App ------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def root():
    return jsonify({"status": "ok", "message": "Plant & Fertilizer API running"})

@app.route('/check-get', methods=['GET'])
def check():
    return jsonify({"message": "hello world"})

@app.route('/check-post', methods=['POST'])
def check_post():
    data = request.get_json(force=True)
    name = data.get('name', None)
    return jsonify({"name": name})

# ------------------ Disease Prediction ------------------
@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files['file']
        img = file.read()
        prediction = predict_image(img)
        prediction = disease_dic.get(prediction, {"error": "Unknown disease"})
        return jsonify(prediction)
    except Exception as e:
        print("❌ Error in /disease-predict:", str(e))
        return jsonify({"error": str(e)}), 500

# ------------------ Crop Prediction ------------------
@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    try:
        if not os.path.exists(CROP_MODEL_FILE):
            raise FileNotFoundError(
                f"❌ Crop model not found at {CROP_MODEL_FILE}.\n"
                "Run `git lfs install && git lfs pull`."
            )
        crop_model = joblib.load(CROP_MODEL_FILE)
        data = np.array([[request.json[k] for k in ['nitrogen','phosphorous','pottasium','temperature','humidity','ph','rainfall']]])
        prediction = crop_model.predict(data)
        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        print("❌ Error in /crop-predict:", str(e))
        return jsonify({"error": str(e)}), 500

# ------------------ Fertilizer Prediction ------------------
@app.route('/predict/fertilizer', methods=['POST'])
def predict_fertilizer():
    cat_model, num_model, prep = load_fertilizer_models()
    try:
        df = pd.DataFrame([request.json])
        X = prep.transform(df)
        cat_pred = cat_model.predict(X).ravel()
        num_pred = num_model.predict(X).ravel()
        fert_types = [fertilizer_mapping.get(int(code), f"Unknown ({code})") for code in cat_pred]
        return jsonify({
            "fertilizer_types": fert_types,
            "fertilizer_amount": float(num_pred[0])
        })
    except Exception as e:
        print("❌ Error in /predict/fertilizer:", str(e))
        return jsonify({"error": str(e)}), 500

# ------------------ Entrypoint ------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Starting Flask on port {port}")
    app.run(host="0.0.0.0", port=port, debug=True)

from flask import Flask, render_template, request, jsonify, redirect
from markupsafe import Markup   # ✅ Fix: import Markup from markupsafe
from flask_cors import CORS
import numpy as np
import pandas as pd
from utils.disease import disease_dic
import requests
import pickle
import io
import config
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9

# ------------------ Disease classes ------------------
disease_classes = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]



# ------------------ Weather API ------------------
# def weather_fetch(city_name):
#     api_key = config.weather_api_key
#     base_url = "http://api.openweathermap.org/data/2.5/weather?"

#     complete_url = base_url + "appid=" + api_key + "&q=" + city_name
#     response = requests.get(complete_url)
#     x = response.json()

#     if x["cod"] != "404":
#         y = x["main"]
#         temperature = round((y["temp"] - 273.15), 2)
#         humidity = y["humidity"]
#         return temperature, humidity
#     else:
#         return None

# ------------------ Disease Prediction ------------------
def predict_image(img):
    disease_model_path = 'models/plant_disease_model.pth'
    disease_model = ResNet9(3, len(disease_classes))
    disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)
    yb = disease_model(img_u)
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    return prediction

# ------------------ Flask App ------------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/check-get', methods=['GET'])
def check():
    return jsonify({"message": "hello world"})

@app.route('/check-post', methods=['POST'])
def check_post():
    if request.method == 'POST':
        Name = request.json['name']
        return jsonify(Name)
    else:
        return jsonify("something went wrong!")

@app.route('/disease-predict', methods=['POST'])
def disease_prediction():
    if request.method == 'POST':
        file = request.files['file']
        try:
            img = file.read()
            prediction = predict_image(img)
            prediction = disease_dic[prediction]
            return jsonify(prediction)
        except Exception as e:
            print("Error:", str(e))
            return jsonify({"err": "something went wrong!"})
    else:
        return jsonify({"err": "oops!!"})

@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    if request.method == 'POST':
        try:
            from joblib import load
            crop_recommendation_model_path = 'models/crop.pkl'  

            # Load the trained crop model
            try:
                crop_recommendation_model = load(crop_recommendation_model_path)
            except Exception as e:
                print("⚠️ Model load failed:", str(e))
                return jsonify({"error": "Model file is incompatible or missing."})

            # Get all input values from user
            N = request.json['nitrogen']
            P = request.json['phosphorous']
            K = request.json['pottasium']
            temperature = request.json['temperature']
            humidity = request.json['humidity']
            ph = request.json['ph']
            rainfall = request.json['rainfall']

            # Prepare input array
            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

            # Predict crop
            my_prediction = crop_recommendation_model.predict(data)
            return jsonify({"prediction": my_prediction[0]})
            
        except Exception as e:
            print("❌ Error in /crop-predict:", str(e))
            return jsonify({"error": "Something went wrong on server."})



if __name__ == '__main__':
    app.run(port=7000)

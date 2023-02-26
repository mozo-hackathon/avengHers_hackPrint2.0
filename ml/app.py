import requests
from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

# @app.route('/api/getEstimate', methods=['GET'])
# @cross_origin(supports_credentials=True)

@app.route('/api/predict', methods=['GET'])
@cross_origin(supports_credentials=True)
def makecalc():

    response = requests.get(url="http://localhost:4000/api/form/63fbbcb70d4ca26efd5b745f")
    formData = response.json()
    print(formData.get('age'))
    data = {'age':formData.get('age'), 'bmi':formData.get('bmi'), 'children':formData.get('children'), 'smoker':formData.get('smoker'), 'illness':formData.get('illness')}
    index = [0] 
    j_data = pd.DataFrame(data, index)    
	# j_data = pd.DataFrame({'age':50, 'bmi':25, 'children':2, 'smoker':1, 'region':2}, 0)
    prediction = np.array2string(lr.predict(j_data))
	
    return jsonify(prediction)


if __name__ == '__main__':

    modelfile = 'E:\dev\mozohack_ml\lr_predict.pickle'    

    # model = p.load(open(modelfile, 'rb'))
    with open('lr_predict.pickle' , 'rb') as f:
        lr = p.load(f)
    app.run(debug=True,host='0.0.0.0')
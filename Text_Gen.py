#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from IPython.display import display, Javascript
from base64 import b64decode

import cv2
import requests
from PIL import Image
from io import BytesIO
import numpy as np
import time
import os

cam = cv2.VideoCapture(0)

cv2.namedWindow('Photo')

subscription_key = "1403fda12aed4df293653a40299e476d"
assert subscription_key

def analyzeImg(image_data):

    vision_base_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/"
    analyze_url = vision_base_url + "analyze" 
    headers    = {'Ocp-Apim-Subscription-Key': subscription_key,
              'Content-Type': 'application/octet-stream'}
    params     = {'visualFeatures': 'Categories,Description,Color'}
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()

    # The 'analysis' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    analysis = response.json()
    # print(analysis)
    image_caption = analysis["description"]["captions"][0]["text"].capitalize()
    return image_caption
    # return analysis

def OCRImg(image_data):

    vision_base_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/"
    ocr_url = vision_base_url + "ocr"
    headers    = {'Ocp-Apim-Subscription-Key': subscription_key,
              'Content-Type': 'application/octet-stream'}
    params  = {'language': 'unk', 'detectOrientation': 'true'}
    response = requests.post(ocr_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()
    
    analysis = response.json()
    text_data  = []
    for region in analysis["regions"]:
        for lines in region["lines"]:
            for word in lines["words"]:
                text_data.append(word["text"])


    return text_data



img_counter = 0

while True:
    ret, frame = cam.read()
    cv2.imshow("feelYourWay", frame)
    if not ret:
        break
    k = cv2.waitKey(30)

    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE pressed
        print("Analyzing the frame")
        im = Image.fromarray(frame)
        imgByteArr = BytesIO()
        im.save(imgByteArr, format='PNG')
        imgByteArr = imgByteArr.getvalue()
        #caption = analyzeImg(imgByteArr)
        #print("You're seeing: ", end='')
        #print(caption)
        ocr = OCRImg(imgByteArr)
        print("Texts around you are: ", end='')
        txt_data = print(" ".join(ocr))
        print(ocr)
        time.sleep(5)
        #img_counter += 1

cam.release()

cv2.destroyAllWindows()


# In[ ]:





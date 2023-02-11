from flask import Flask, render_template, request, jsonify
import bcrypt
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('')
db = client.__
from flask import Flask, render_template, request, jsonify


import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.n2wdmo7.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/registration", methods=["POST"])
def webtoon_post():
    url_receive = request.form['url_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)


    doc = {
        'star':star_receive,
        'comment':comment_receive
    }
    db.webtoon.insert_one(doc)

    return jsonify({'msg':'업로드 성공'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
# # 저장 - 예시
# doc = {'name':'bobby','age':21}
# db.users.insert_one(doc)

# # 한 개 찾기 - 예시
# user = db.users.find_one({'name':'bobby'})

# # 여러개 찾기 - 예시 ( _id 값은 제외하고 출력)
# all_users = list(db.users.find({},{'_id':False}))

# # 바꾸기 - 예시
# db.users.update_one({'name':'bobby'},{'$set':{'age':19}})

# # 지우기 - 예시
# db.users.delete_one({'name':'bobby'})


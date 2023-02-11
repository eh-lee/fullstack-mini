from flask import Flask, render_template, request, jsonify

import requests
from bs4 import BeautifulSoup
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.n2wdmo7.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta
app = Flask(__name__,static_folder="./static/")


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

@app.route('/webtoon-list', methods=["GET"])
def webtoon_list():
    url_receive = list(db.webtoon.find({}, {'_id':False}))
    webtoon_list = []

    for item in url_receive:
        url = item['url']
        naver_detail_data = requests.get(url, headers=headers)
        detail_soup = BeautifulSoup(naver_detail_data.text, 'html.parser')
        webtoon = detail_soup.select('#content > div.comicinfo')

        for item in webtoon:
            webtoon_title = item.select_one('div.detail > h2 > span.title').text
            webtoon_img = item.select_one('div.thumb > a > img')['src']
            webtoon_desc = item.select_one('div.detail > p:nth-child(2)').text
            webtoon_url = 'https://comic.naver.com' + item.select_one('div.thumb > a')['href']
            webtoon_writer = item.select_one('div.detail > h2 > span.wrt_nm').text.strip()
            webtoon_genre = item.select_one('div.detail > p.detail_info > span.genre').text

            webtoon_list.append(
                {
                    'title': webtoon_title,
                    'img': webtoon_img,
                    'desc': webtoon_desc,
                    'url': webtoon_url,
                    'writer': webtoon_writer,
                    'genre': webtoon_genre
                }
            )

            print(webtoon_url)

    print(webtoon_list)
    return jsonify({'webtoon-list':webtoon_list})

@app.route("/user", methods=["POST"])
def newUser_post():
    id_receive = request.form['id_give']
    password_receive = request.form['password_give']
    sex_receive = request.form['sex_give']
    name_receive = request.form['name_give']

    doc = {
        'id' : id_receive,
        'password' : password_receive,
        'name' : name_receive,
        'sex' : sex_receive
    }
    db.user.insert_one(doc)
    
    return jsonify({'msg':'회원가입 성공'})

@app.route("/user/login", methods=["POST"])
def login_post():
    id_receive = request.form['id_give']
    password_give = request.form['password_give']

    checkLogin = db.user.find_one({'id':id_receive},{'_id':False})
    
    if checkLogin == None :
        is_success = "실패"
    elif checkLogin['password'] == password_give :
        is_success = "성공"
    
    userName = checkLogin['name']
    # print(checkLogin)
    return jsonify({'msg': '로그인 성공', 'is_success' : is_success, 'userName' : userName})

@app.route("/test", methods=["POST"])
def comment_post():
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']
    doc = {
        'star': star_receive,
        'comment': comment_receive
    }
    db.test.insert_one(doc)
    return jsonify({'msg':'완료!'})

@app.route("/test/comment", methods=["GET"])
def comment_get():
    comment_list = list(db.test.find({},{'_id': False}))
    return jsonify({'comments':comment_list})

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


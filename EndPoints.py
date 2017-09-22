from flask import Flask,send_file
from flask import Response
from flask import request
from flask import json
import sqlite3
from flask import g
import urllib
import datetime
from flask import jsonify

app = Flask(__name__)
DATABASE = 'database.db'

def connect_db():
	return sqlite3.connect(DATABASE)

@app.route("/")
def index():
	# result = {"result" : "Hello"}
	# res = json.dumps(result)
	# response = Response(res,status=200,mimetype='application/json')
	# return response
	return send_file("static/templates/index.html")



@app.route("/register",methods=['POST'])
def register():
	now = str(datetime.datetime.now())
	request.headers['Content-Type'] == 'application/json'
	registerData = request.get_data()
	unquoted = urllib.unquote(registerData)
	registerData = json.loads(unquoted)

	name = registerData['name']
	password = registerData['password']

	conn = connect_db()
	cursor = conn.cursor()
	create = "CREATE TABLE IF NOT EXISTS userDetails ( name TEXT, password TEXT, events TEXT, tracking DATETIME)"
	cursor.execute(create)

	select = "SELECT COUNT(*) FROM userDetails where events = 'register' and name ='" + name + "' and password = '" + password + "'"
	cursor.execute(select)
	exists = cursor.fetchone()[0]
	if (exists > 0):
		data = {"result" : "unsuccess"}
		res = json.dumps(data)
		resp = Response(res,status=200,mimetype='application/json')		
		return resp

	else:
		query = "INSERT INTO userDetails(name,password,events,tracking) VALUES('"+ name + "','" + password + "','register', '"+ now +"')"
		cursor.execute(query)
		conn.commit()
		conn.close()

		data = {"result" : "success"}
		res = json.dumps(data)
		resp = Response(res,status=200,mimetype='application/json')

		return resp

@app.route("/login",methods=['POST'])
def login():
	now = str(datetime.datetime.now())
 	request.headers['Content-Type'] == 'application/json'
	registerData = request.get_data()
	unquoted = urllib.unquote(registerData)
	registerData = json.loads(unquoted)

	name = registerData['name']
	password = registerData['password']

	conn = connect_db()
	cursor = conn.cursor()
	select = "SELECT COUNT(*) FROM userDetails where events = 'register' and name ='" + name + "' and password = '" + password + "'"
	cursor.execute(select)
	exists = cursor.fetchone()[0]

	#when the user is not registered yet
	if(exists == 0):
		data = {"result" : "unsuccess"}
		res = json.dumps(data)
		resp = Response(res,status=200,mimetype='application/json')	
		return resp
		
	else:
		loginQuery = "SELECT COUNT(*) FROM userDetails where events = 'login' and name ='" + name + "' and password = '" + password + "'"
		cursor.execute(loginQuery)
		loginCount = cursor.fetchone()[0]

		if(loginCount == 0):
			#print('first time')
			query =  "SELECT name FROM userDetails where events = 'register' and name ='" + name + "' and password = '" + password + "'" #first time login
			cursor.execute(query)
			result = cursor.fetchone()

			query = "INSERT INTO userDetails(name,password,events,tracking) VALUES('"+ name + "','" + password + "','login', '"+ now +"')"
			cursor.execute(query)

			conn.commit()
			conn.close()
			#name = result
			#session['logged_in'] = True
			
			data = {"name" :  name,
					
					"result" : "success"}
		 	res = json.dumps(data)
		 	resp = Response(res,status=200,mimetype='application/json')
		 	resp.set_cookie(b'userName' , name)
		 	return resp

		else: #have logged in before
			#print('many times')
			loginQuery = "SELECT events,tracking FROM userDetails where events != 'register' and name ='" + name + "' and password = '" + password + "'"
			cursor.execute(loginQuery)
			result = cursor.fetchall()
			#print json.dumps(result)

			query = "INSERT INTO userDetails(name,password,events,tracking) VALUES('"+ name + "','" + password + "','login', '"+ now +"')"
			cursor.execute(query)

			conn.commit()
			conn.close()

			#session['logged_in'] = True

			# for row in result:
			# 	print row
			data = { "name" : name,
					 "json" : result,
					 "result" : "success"}
			res = json.dumps(data)
			#print(res)
	 		resp = Response(res,status=200,mimetype='application/json')
	 		resp.set_cookie('userName' , name)
	 		return resp


		# query = "SELECT name,password FROM userDetails where events = 'register' and name ='" + name + "' and password = '" + password + "'"
		# cursor.execute(query)
		# result = cursor.fetchone()
		# conn.commit()
		# conn.close()

		# name,password = result

		# data = {"name" :  name,
		# 		"password" : password,
		# 		"result" : "success"}
	 # 	res = json.dumps(data)
	 # 	resp = Response(res,status=200,mimetype='application/json')
	 # 	return resp




@app.route("/logout",methods=['POST'])
def logout():
	now = str(datetime.datetime.now())

	request.headers['Content-Type'] == 'application/json'
	registerData = request.get_data()
	unquoted = urllib.unquote(registerData)
	registerData = json.loads(unquoted)

	name = registerData['name']
	password = registerData['password']

	conn = connect_db()
	cursor = conn.cursor()
	query = "INSERT INTO userDetails(name,password,events,tracking) VALUES('"+ name + "','" + password + "','logout', '"+ now +"')"
	cursor.execute(query)

	conn.commit()
	conn.close()

	data = {"result" : "success"}
	res = json.dumps(data)
	resp = Response(res,status=200,mimetype='application/json')
	resp.set_cookie('userName','',expires = 0)
	return resp

@app.route('/status')
def status():
    # if session.get('logged_in'):
    # 	print("if")
    #     if session['logged_in']:
    #     	print("success")
    data = {"result" : "success"}
    res = json.dumps(data)
    resp = Response(res,status=200,mimetype='application/json') 
    return resp
    # else:
    # 	print("unsuces")
    #     data = {"result" : "unsuccess"}
    #     res = json.dumps(data)
    #     resp = Response(res,status=200,mimetype='application/json') 
    #     return resp


@app.route("/eventlog",methods=['POST'])
def eventlog():
	#print('running')
	request.headers['Content-Type'] == 'application/json'
	registerData = request.get_data()
	unquoted = urllib.unquote(registerData)
	registerData = json.loads(unquoted)
	

	name = registerData['name']
	eventType = registerData['type']
	eventContent = registerData['content']
	link = registerData['link']
	tracking = registerData['date']


	conn = connect_db()
	cursor = conn.cursor()
	create = "CREATE TABLE IF NOT EXISTS userLogs ( name TEXT, eventType TEXT, content TEXT, link TEXT, tracking DATETIME)"
	cursor.execute(create)

	query = "INSERT INTO userLogs(name,eventType,content,link,tracking) VALUES('"+ name + "','" + eventType + "','"+ eventContent + "','"+ link + "', '"+ tracking +"')"
	cursor.execute(query)

	conn.commit()
	conn.close()

	data = {"result" : "success"}
	res = json.dumps(data)
	resp = Response(res,status=200,mimetype='application/json')
	return resp

@app.route("/events",methods=['POST'])
def events():
	request.headers['Content-Type'] == 'application/json'
	registerData = request.get_data()
	unquoted = urllib.unquote(registerData)
	registerData = json.loads(unquoted)
	

	name = registerData['name']
	#print(name)
	
	conn = connect_db()
	#print(conn)
	cursor = conn.cursor()
	create = "CREATE TABLE IF NOT EXISTS userLogs ( name TEXT, eventType TEXT, content TEXT, link TEXT, tracking DATETIME)"
	cursor.execute(create)

	query = "SELECT eventType,content,link,tracking FROM userLogs where name ='" + name + "'"
	
	#print(query)
	
	#print(result)
	cursor.execute(query)
	result = cursor.fetchall()
	#print(result)
	#conn.commit()
	conn.close()

	data = {"name" : name,
			"json" : result,
			"result" : "success"}
	res = json.dumps(data)
	resp = Response(res,status=200,mimetype='application/json')
	return resp

if __name__ == "__main__":
	app.run(host='0.0.0.0',port='8082')
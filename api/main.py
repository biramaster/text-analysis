import sqlite3
from sqlite3 import Error
from flask import Flask


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello, World!!!"

if __name__ == '__main__':
    create_connection("sqlite3:/database/articles.db")
    app.run(host="0.0.0.0", port=5050)


"""
# get function for querying
async def get(query, values = {}):
  rows = await db.fetch_all(query=query, values=values)
  dicts = []
  for row in rows:
    dicts.append(dict(row))
  return dicts

# execute function for db
async def run(query, values):
  return await db.execute(query=query, values=values)


app = Sanic("REST API")

@app.get('/rest')
async def get_rest(request):
    restDescription = [
        {
        "route":"/rest",
        "methods": ["GET"],
        "description":"This route: The API documentation"
        },
        {
        "route":"/rest/foods",
        "methods": ["GET"],
        "description":"List available foods"
        },
        {
        "route":"/rest/food/:id",
        "methods": ["GET"],
        "description":"Get food matching id"
        },
        {
        "route":"/rest/users",
        "methods": ["GET"],
        "description":"List users"
        },
        {
        "route":"/rest/users",
        "methods": ["POST"],
        "description":"Create a user"
        }     
    ]
    return json(restDescription)

# foods
@app.get('/rest/foods')
async def get_foods(request):
  foods = await get('SELECT * FROM foods')
  return json(foods)

@app.get('/rest/foods/<id>')
async def get_food(request, id):
  food = await get('SELECT * FROM foods WHERE id = :id', { "id": id })
  return json(food)

# users
@app.get('/rest/users/')
async def get_users(request):
  users = await get('SELECT * FROM users')
  return json(users)

@app.post('/rest/users/')
async def register(request):
  user = request.json
  result = await run('INSERT INTO users(email, password, first_name, last_name) VALUES(:email, :password, :first_name, :last_name)', {
    "email": user['email'], "password": user['password'], "first_name": user['first_name'], "last_name": user['last_name']})
  return json(result)

# search
@app.post('/rest/search/')
async def register(request):
  search = request.json
  result = await get("SELECT * FROM foods WHERE title LIKE :one OR text LIKE :two", {"one": '%' + search['searchString'] + '%', "two": '%' + search['searchString'] + '%'})
  return json(result)

if __name__ == '__api__':
    app.run()
"""
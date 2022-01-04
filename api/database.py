'''
  Create a table for locations on a map

  Parameters
  ----------
  db: A database file name.

  Returns
  -------
  Rows of data.

  Example
  -------
  database=Database("articles.db")

  @author André Rubira 
  @version 2021-12-11
'''

import sqlite3

class Database:
    def __init__(self,db):
        self.conn=sqlite3.connect(db)
        self.cur=self.conn.cursor()
        self.cur.execute("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title text, articleText text)")
        self.conn.commit()

    def insert(self,id,title, articleText):
        self.cur.execute("INSERT INTO articles VALUES (NULL,?,?)",(title, articleText))
        self.conn.commit()

    def view(self):
        self.cur.execute("SELECT * FROM articles")
        rows=self.cur.fetchall()
        return rows
    
    def search(self,title="", articleText=""):
        self.cur.execute("SELECT * FROM articles WHERE title=? OR articleText=?",(title, articleText))
        rows=self.cur.fetchall()
        return rows

    def delete(self,id):
        self.cur.execute("DELETE FROM articles WHERE id=?",(id,))
        self.conn.commit()

    def update(self,id,location_name, latitude, longitude, location_category):
        self.cur.execute("UPDATE articles SET title=?,articleText=? WHERE id=?",(title, articleText))
        self.conn.commit()

    def __del__(self):
        self.conn.close()

""" 
        bengali = row[6]
        portuguese = row[7]
        russian = row[8]
        japanese = row[9]
        javanese = row[10] 
 """
import csv

with open("./db/ar.sql", "a", encoding="utf-16") as f, open("./db/numbers.csv", "r", encoding="utf-8") as t:
    reader = csv.reader(t)
    next(reader)

    i = 0
    for row in reader:
        i += 1  
        word = row[5]
        f.write(f"insert into ar(id, audio, word) values ({i}, null, '{word}');\n")
       

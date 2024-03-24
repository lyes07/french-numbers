f = open("./Backend/frinsert.txt", "a")
t = open("./Backend/numbers.txt", "r")

i=0

for line in t:
    i+=1
    f.write("insert into frnum(id,audio,word) values("+str(i)+",null,\'"+str(line.removesuffix("\n"))+"\');\n")
    
t.close()
f.close()



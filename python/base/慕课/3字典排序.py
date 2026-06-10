"""元组 sort"""

tuple1 = (3, 4)
tuple2 = (2, 5)

print(tuple1 > tuple2)  # True (按照位置比， 第一项大 后面就不用 比了)


""" 元组sort """
""" 元组sort """
""" 元组sort """
from random import randint

dict1 = {x: randint(60, 100) for x in "abcdefghopq"}
print(dict1, "------------------------------------------------------------")
tuple3 = [(v, k) for (k, v) in dict1.items()]
tuple4 = sorted(tuple3, reverse=True)  # sorted 不改变原 对象
print(tuple4, "------------------------------------------------------------")


print("------------------------------------------------------------")
""" zip 函数 """
""" zip 函数 """
""" zip 函数 """
tuple5 = zip(dict1.values(), dict1.keys())
print(sorted(list(tuple5), reverse=True))


""" sorted函数排序 """
""" sorted函数排序 """
""" sorted函数排序 """
tuple6 = sorted(dict1.items(), key=lambda x: x[1], reverse=True)
print(tuple6, "这个是过渡数据---------------------------------------")

tuple7 = [(y, x) for (x, y) in tuple6]
print(tuple7)


""" enumerate """
""" enumerate """
""" enumerate """
dict2 = {k: (idx, v) for idx, (k, v) in enumerate(dict1.items(), 1)}
print(dict2)

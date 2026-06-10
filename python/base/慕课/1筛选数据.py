"""
过滤负数
https://www.bilibili.com/video/BV1QE411u7vK/?vd_source=23e30598eabb64562a0df473da25ecb4
"""

""" 列表 使用推导式 """
""" 列表 使用推导式 """
""" 列表 使用推导式 """
list1 = [3, 9, -1, 10 - 20, -3]
list2 = [x for x in list1 if x > 0]
print(list2)  # [3, 9]


from random import randint

# 随机产生 -10 到 10 区间内到数字，循环10次
list3 = [randint(-10, 10) for _ in range(10)]
print(list3, len(list3))  # [...] 10

""" filter 函数 过滤 list"""
""" filter 函数 过滤 list"""
""" filter 函数 过滤 list"""
list4 = filter(lambda x: x > 0, list3)
print(list(list4))  # list4 是一个 生成器列表 需要使用 list 求值 才能展示成为 list


"""字典 使用推导式"""
"""字典 使用推导式"""
"""字典 使用推导式"""
"""字典 使用推导式"""
dict1 = {"a": 70, "b": 99, "c": 86, "d": 40}
dict2 = {x: y for x, y in dict1.items() if y > 85}
print(dict2)  # {'b': 99, 'c': 86}


""" filter 函数 过滤 dict"""
""" filter 函数 过滤 dict"""
""" filter 函数 过滤 dict"""
dict3 = {"student%d" % x: randint(1, 100) for x in range(0, 10)}
print(dict3)

dict4 = filter(lambda item: item[1] > 60, dict3.items())  # Iterable
print(dict(dict4))


"""集合 使用推导式"""
"""集合 使用推导式"""
"""集合 使用推导式"""
set1 = {90, 38, 77, 66}
set2 = {x for x in set1 if x > 60}
print(set2)  # {90, 77, 66}

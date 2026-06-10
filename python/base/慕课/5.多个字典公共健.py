from random import randint

# dict1 = {x: randint(10, 20) for x in "abcdefghow"}
# print(dict1)

dict1 = {
    "a": 16,
    "b": 16,
    "c": 18,
    "d": 16,
    "e": 12,
    "f": 11,
    "g": 15,
    "h": 19,
    "o": 17,
    "w": 10,
}

# dict2 = {x: randint(10, 20) for x in "hopw"}
# print(dict2)

dict2 = {"h": 17, "o": 20, "p": 12, "w": 19}
dict3 = {"h": 0, "w": 2}

set1 = dict1.keys() & dict.keys(dict2) & dict.keys(dict3)
print(set1)  #  # {'w', 'h'}

import functools

"""三种 获取 dict key 的方式"""
"""三种 获取 dict key 的方式"""
"""三种 获取 dict key 的方式"""
set2 = functools.reduce(
    lambda a, b: a & b, [dict1.keys(), dict.keys(dict2), dict.keys(dict3)]
)
print(set2)  # {'w', 'h'}


"""使用推导式"""
"""使用推导式"""
"""使用推导式"""
print({x for x in dict1 if x in dict2 and x in dict3})  # {'w', 'h'}


"""使用推导式 无限扩展"""
"""使用推导式 无限扩展"""
"""使用推导式 无限扩展"""
list1 = [dict1.keys(), dict.keys(dict2), dict.keys(dict3)]
# print(list1)
# [
# dict_keys(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'o', 'w']),
# dict_keys(['h', 'o', 'p', 'w']),
# dict_keys(['h', 'w'])
# ]

# print(
#     list(map(lambda d: d, list1[1:]))
# )  # [dict_keys(['h', 'o', 'p', 'w']), dict_keys(['h', 'w'])]


"""这里的 all 实际是 每次 x 从 list1 取出来 都要参与运算一次 

类似这样的结构： 
    [x for x in list1[0] if all[True, False]]
"""
print([x for x in list1[0] if all(map(lambda d: x in d, list1[1:]))])  # {'w', 'h'}

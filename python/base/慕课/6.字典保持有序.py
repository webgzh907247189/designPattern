# dict1 = {}

# dict1["c"] = 1
# dict1["a"] = 2
# dict1["b"] = 3

# print(dict.keys(dict1))  # dict_keys(['c', 'a', 'b'])


dist1 = list("abcdeftgsiw")

from collections import OrderedDict
from itertools import islice
from random import shuffle

# 洗牌 打乱
shuffle(dist1)

dict2 = dict((v, idx) for idx, v in enumerate(dist1, 1))
print(dict2, "----", isinstance(dict2, dict))


def query_by_name(d, name):
    # return d[name]
    # 最好使用 get 可以兼容错误

    return d.get(name)


print(query_by_name(dict2, "a"))


# 可以查询具体第几名 (第一名 其实就是 第0个)
# 可以查询 第2名到 第7名 范围内的学生
def query_by_order(d, a, b=None):
    a -= 1
    if b is None:
        b = a + 1
    return list(islice(d, a, b))


print(query_by_order(dict2, 1))
print(query_by_order(dict2, 1, 3))

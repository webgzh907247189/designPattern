from random import randint

# list1 = [randint(0, 20) for _ in range(30)]
# print(list1)


list1 = [7, 4, 9, 1, 14, 1, 14, 14, 2, 0, 19, 4, 3, 19, 19, 19]

dict1 = dict.fromkeys(list1, 0)
print(dict1, "初始化空字典")

for x in list1:
    dict1[x] += 1


# [(4, 19), (2, 14), (2, 4), (2, 1), (1, 9), (1, 7), (1, 3), (1, 2), (1, 0)]

result = sorted([(v, k) for (k, v) in dict1.items()], key=lambda v: v, reverse=True)[:3]
print(result)  # [(4, 19), (2, 14), (2, 4)]

import heapq

print(
    heapq.nlargest(3, [(v, k) for (k, v) in dict1.items()])
)  # [(4, 19), (3, 14), (2, 4)]

"""这里传入的元素是元组 不是列表， 上面那个案例传入的是 列表"""
print(
    heapq.nlargest(3, ((v, k) for (k, v) in dict1.items()))
)  # [(4, 19), (3, 14), (2, 4)]


"""使用Counter"""
"""使用Counter"""
"""使用Counter"""
from collections import Counter

result2 = Counter(list1).most_common(3)

result3 = [(y, x) for (x, y) in result2]
print(
    result3, "使用Counter", result2
)  #  [(4, 19), (3, 14), (2, 4)] 使用Counter [(19, 4), (14, 3), (4, 2)]

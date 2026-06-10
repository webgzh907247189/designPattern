"""
使用 元组 比使用 字典 更省内存
"""

"""全局定义"""
"""全局定义"""
"""全局定义"""
NAME = 0
AGE = 1
SEX = 2

Student = ("ggg", 18, 1, "18255@163.com", "中国北京市朝阳区xxx街")
print(Student[NAME], Student[AGE])  # ggg 18


"""使用 IntEnum 创建元组"""
"""使用 IntEnum 创建元组"""
"""使用 IntEnum 创建元组"""
from enum import IntEnum


class StudentEnum(IntEnum):
    EMAIL = 3
    ADDRESS = 4


print(StudentEnum.EMAIL, Student[StudentEnum.EMAIL])  # 3 18255@163.com


"""使用 collections 创建元组"""
"""使用 collections 创建元组"""
"""使用 collections 创建元组"""
from collections import namedtuple

Student1 = namedtuple("AAA", ["name", "age", "sex"])
s2 = Student1("ggg", 20, "男")
print(s2.age, s2[1], s2)  # 20 20 AAA(name='ggg', age=20, sex='男')

data = {"id": 101, "product": "Laptop", "price": 1200, "quantity": 5}

# # 使用 del 关键字删除元素
# # 删除键"quantity"及其对应的值
# del data["quantity"]
# # 打印删除后的字典
# print("删除quantity后:", data)

# # 使用 pop() 方法删除元素并获取其值
# # 删除键"price"并返回其值
# removed_price = data.pop("price")
# # 打印删除后的字典
# print("删除price后:", data)
# # 打印被删除的值
# print("被删除的价格:", removed_price)


"""
removed_discount = data.pop("discount", 0)
# 打印删除后的字典（字典未改变）
print("尝试删除不存在的键后:", data)
# 打印返回的默认值
print("被删除的折扣（不存在，返回默认值）:", removed_discount)


# 使用popitem()方法删除并返回最后一个键值对
# 删除最后一个键值对
last_item = data.popitem()
# 打印删除后的字典
print("删除最后一个元素后:", data)
# 打印被删除的键值对
print("被删除的元素:", last_item)

"""


scores = {"Math": 95, "English": 88, "Science": 92}

# 同时遍历键和值
print("--- 同时遍历键和值 ---")
# 遍历字典的所有键值对，每次迭代获取键和值
for subject, score in scores.items():
    # 打印当前键和值
    print(f"{subject}: {score}")


for index, subject in enumerate(scores):
    # 打印索引、键和对应的值
    print(f"索引 {index}: {subject} = {scores[subject]}")


# 9. fromkeys(seq, value=None): 从序列创建字典，所有键的值都相同
# 从列表创建字典，所有键的值都为0
counter = dict.fromkeys(["a", "b", "c"], 0)
# 打印创建的字典
print(f"fromkeys(['a', 'b', 'c'], 0): ---- {counter}")


input_string_valid = "123"
input_string_invalid = "abc"
input_string_float = "3.14"
print(
    input_string_valid.isdigit(),
    f"'{input_string_valid}' 转换为整数: {int(input_string_valid)}",
)


class User:
    # 构造方法，初始化实例属性
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
        print(type(self))

    # 实例方法，返回用户显示字符串
    def display(self) -> str:
        return f"{self.name} <{self.email}>"


# 创建 User 实例
user = User("Alice", "a@example.com")
print(type(User), user)


import copy

user = {"name": "1"}

userCopy1 = copy.copy(user)
userCopy2 = user.copy()

print(
    userCopy1, userCopy2, userCopy1 == userCopy2, userCopy1 is userCopy2
)  # {'name': '1'} {'name': '1'} True False


# update() 是原地修改，不生成新字典，适合在副本上使用。
# update() 是原地修改，不生成新字典，适合在副本上使用。
# update() 是原地修改，不生成新字典，适合在副本上使用。
user2 = user.update({"name": "2"})  # False {'name': '2'}
print(user is user2, user)  # False {'name': '2'}

# | 运算符返回一个新字典，原字典不变。
# | 运算符返回一个新字典，原字典不变。
# | 运算符返回一个新字典，原字典不变。
user3 = user | {"name": "2"}
print(user is user3, user)  # False {'name': '1'}


""" 学习 dict  """
user4 = {"name": "1", "extra": "11"}
user5 = {k: v for k, v in user4.items() if k != "extra"}
print(user5)  # {'name': '1'}

final_config = user4 | user5
print(final_config)  # {'name': '1'}
""" 学习 dict  """
